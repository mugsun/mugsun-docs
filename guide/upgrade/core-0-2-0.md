# core 0.1.0 → 0.2.0

::: warning 0.2.0 尚未发布
截至 2026-10-21，Maven Central 上只有 0.1.0，git 上也只有 `v0.1.0` 这个 tag。

主干版本是 `0.2.0-SNAPSHOT`。

本篇依据主干 CHANGELOG 的 Unreleased 一节，正式发布前内容可能还会变化。
:::

boot 主干已经依赖 core `0.2.0-SNAPSHOT`。用 boot 主干的项目已经在用这些变更。

## 破坏性变更

### 接口加密改为 SM4-GCM，开箱即用、可选覆盖

core 去掉了内置密钥，接口加密改为 SM4-GCM。

- 没有配置 `MUGSUN_API_KEY` 时不再拒绝启动，首次启动自动生成 16 字节密钥。
  - 密钥存到 `~/.mugsun/api-transport.key`，之后重启复用；
  - 目录可用 `mugsun.home` / `MUGSUN_HOME` 改。
- 配了 `MUGSUN_API_KEY` 就用配的。
  - 必须是 32 位 hex，或者带填充、解码后正好 16 字节的标准 base64；
  - 长度不对时直接报错，不会补零或截断；
  - 解码后等于已删除的旧内置默认值时也拒绝启动。
- Docker 不挂卷、多实例部署必须配 `MUGSUN_API_KEY` 或挂共享卷，否则重启换钥、实例间解不开。
- 密文格式改为 base64(IV 12 字节 ‖ 密文 ‖ 标签)。0.1.0 的 CBC 密文无法再解密，前后端必须一起升级。
- 解密失败统一返回「接口密文无效」。
- `encrypt(null)` 和 `decrypt(null)` 都返回 null，不再抛异常。

接口加密只是传输混淆，不防重放，也不绑定接口，不能代替 HTTPS。

### 唯一约束冲突返回 400

插入或更新触发唯一约束冲突时，HTTP 状态从 500 改为 400。

响应体的 `code` 是 400，`msg` 是「数据已存在，请勿重复提交」，不带 SQL、约束名和字段值。

这类错误不再写入 boot 的错误日志表 `sys_error_log`，只在服务端记一条 WARN。

前端如果按 500 判断重复提交，需要改为按 400 判断。

### 达梦的唯一键错误码

`mugsun-starter-mybatis` 在 classpath 根目录新增了 `sql-error-codes.xml`。

这个文件补上达梦的唯一键错误码 -6602、-6612、-6625。

应用自己在 classpath 根目录放了 `sql-error-codes.xml` 时，会遮住这份文件，需要把达梦的条目抄过去。

## 配置项的变化

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `mugsun.crypto.api-key` | 空 | 新增，对应环境变量 `MUGSUN_API_KEY`，可选；没配就自动生成 |
| `mugsun.home` | `~/.mugsun` | 新增，对应环境变量 `MUGSUN_HOME`，自动生成的密钥文件放这里 |
| `mugsun.crypto.strict-keys` | `false` | 原有配置项，不再影响接口加密 |

开发过程中出现过的 `allow-ephemeral-keys` 已移除，配了也不生效。

## 许可证

许可证从 Apache-2.0 改为 MIT。Maven Central 上已发布的 0.1.0 构件仍保留发布时声明的 Apache-2.0。

## 升级步骤

1. 单实例、`~/.mugsun` 能持久保存的部署，什么都不用配。
2. Docker 不挂卷或多实例部署，生成密钥并在所有实例配置同一个 `MUGSUN_API_KEY`：

   ```bash
   openssl rand -hex 16
   ```

3. 把前端的接口加密改为 SM4-GCM 和新的密文格式，登录后从 `GET /crypto/bootstrap` 取密钥，与后端同时上线。
4. 检查前端对重复提交的判断，从按 500 改为按 400。
5. 用达梦并且自带 `sql-error-codes.xml` 的项目，合并达梦的错误码条目。
6. 0.2.0 发布后，把依赖版本改为 `0.2.0`。

## 看效果

不配置 `MUGSUN_API_KEY` 启动应用，首次启动日志里有这样一行（路径按实际用户目录）：

```text
未配置 MUGSUN_API_KEY，已自动生成接口加密密钥并保存到 /home/you/.mugsun/api-transport.key
```

再重启一次，这行不再出现，只剩一条 WARN 说明当前用的是自动生成的密钥和文件路径。

重复新增一条已经存在的数据。接口返回 HTTP 400，响应体的 `code` 是 400，`msg` 是「数据已存在，请勿重复提交」。

确认项目实际用的 core 版本：

```bash
mvn dependency:tree | grep com.mugsun
```
