# core 0.1.0 → 0.2.0

::: warning 0.2.0 还没有发布
截至 2026-11-20，Maven Central 和 git tag 都只有 0.1.0，主干版本是 `0.2.0-SNAPSHOT`。

本篇依据主干 CHANGELOG 的 Unreleased 一节，正式发布前内容可能还会变化。
:::

boot 主干已经依赖 core `0.2.0-SNAPSHOT`，用 boot 主干的项目已经在用这些变更。

## 先看哪些变更影响你

| 变更 | 谁受影响 | 要做什么 |
| --- | --- | --- |
| [接口加密改为 SM4-GCM](#api-crypto) | 用了接口加密的前后端 | 前后端一起升级 |
| [唯一约束冲突返回 400](#duplicate-key) | 按 500 判断重复提交的前端 | 改为按 400 判断 |
| [达梦的唯一键错误码](#dm-error-codes) | 用达梦并且自带 `sql-error-codes.xml` 的项目 | 合并达梦的条目 |
| [许可证改为 MIT](#license) | 再分发 core 的项目 | 核对许可声明 |

## 接口加密改为 SM4-GCM {#api-crypto}

core 去掉了内置密钥，接口加密从 SM4-CBC 改为 SM4-GCM。0.1.0 的密文无法再解密，前后端必须一起升级。

### 密钥从哪里来

没有配置 `MUGSUN_API_KEY` 时不再拒绝启动，首次启动自动生成一个 16 字节的密钥。

密钥存到 `~/.mugsun/api-transport.key`，之后每次重启继续用。

存放目录可以用 `mugsun.home` 或环境变量 `MUGSUN_HOME` 修改。

配了 `MUGSUN_API_KEY` 就用配置的值，要求如下：

- 必须是 32 位 hex，或者带填充、解码后正好 16 字节的标准 base64。
- 长度不对时直接报错，不会补零或截断。
- 解码后等于已删除的旧内置默认值时，拒绝启动。

::: warning 这两种部署必须配置密钥
Docker 没有给密钥目录挂卷时，每次重启都会换密钥。多实例各自生成密钥，互相解不开。

这两种部署要给所有实例配置同一个 `MUGSUN_API_KEY`，或者挂一个共享卷。
:::

### 密文和接口的变化

- 密文格式改为 `base64(IV 12 字节 ‖ 密文 ‖ 标签)`。
- 解密失败只报同一个错误，不区分密钥不对、格式不对和被篡改。
- 标了 `@ApiDecrypt` 的接口解密失败时，返回「加密报文解密失败」。
- `encrypt(null)` 和 `decrypt(null)` 都返回 null，不再抛异常。

接口加密只是传输混淆，不防重放，也不绑定接口，不能代替 HTTPS。

## 唯一约束冲突返回 400 {#duplicate-key}

插入或更新触发唯一约束冲突时，HTTP 状态从 500 改为 400。

响应体的 `code` 是 400，`msg` 是「数据已存在，请勿重复提交」，不带 SQL、约束名和字段值。

这类错误不再写入 boot 的错误日志表 `sys_error_log`，只在服务端记一条 WARN。

前端如果按 500 判断重复提交，需要改为按 400 判断。

## 达梦的唯一键错误码 {#dm-error-codes}

`mugsun-starter-mybatis` 在 classpath 根目录新增了 `sql-error-codes.xml`。

这个文件补上达梦的唯一键错误码 -6602、-6612、-6625。

应用自己在 classpath 根目录放了 `sql-error-codes.xml` 时，会遮住这份文件，需要把达梦的条目抄过去。

## 许可证改为 MIT {#license}

许可证从 Apache-2.0 改为 MIT。Maven Central 上已发布的 0.1.0 构件仍保留发布时声明的 Apache-2.0。

## 配置项的变化

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `mugsun.crypto.api-key` | 空 | 新增，对应环境变量 `MUGSUN_API_KEY`。不配就自动生成 |
| `mugsun.home` | `~/.mugsun` | 新增，对应环境变量 `MUGSUN_HOME`。自动生成的密钥文件放在这里 |
| `mugsun.crypto.strict-keys` | `false` | 原有配置项，不再影响接口加密 |

开发过程中出现过的 `allow-ephemeral-keys` 已移除，配了也不生效。

## 升级步骤

1. 单实例、`~/.mugsun` 能持久保存的部署，不用配置密钥。
2. Docker 不挂卷或多实例部署，生成密钥并在所有实例配置同一个 `MUGSUN_API_KEY`：

   ```bash
   openssl rand -hex 16
   ```

3. 把前端的接口加密改为 SM4-GCM 和新的密文格式，登录后从 `GET /crypto/bootstrap` 取密钥，与后端同时上线。
4. 检查前端对重复提交的判断，从按 500 改为按 400。
5. 用达梦并且自带 `sql-error-codes.xml` 的项目，合并达梦的错误码条目。
6. 0.2.0 发布后，把依赖版本改为 `0.2.0`。

## 看效果

不配置 `MUGSUN_API_KEY` 启动应用，首次启动的日志里有这样一行，路径按实际的用户目录：

```text
未配置 MUGSUN_API_KEY，已自动生成接口加密密钥并保存到 /home/you/.mugsun/api-transport.key
```

再重启一次，这一行不再出现，只剩一条 WARN，说明当前用的是自动生成的密钥和文件路径。

重复新增一条已经存在的数据。接口返回 HTTP 400，响应体的 `code` 是 400，`msg` 是「数据已存在，请勿重复提交」。

确认项目实际用的 core 版本：

```bash
mvn dependency:tree | grep com.mugsun
```
