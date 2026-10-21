# core 0.1.0 → 0.2.0

::: warning 0.2.0 尚未发布
截至 2026-10-21，Maven Central 上只有 0.1.0，git 上也只有 `v0.1.0` 这个 tag。

主干版本是 `0.2.0-SNAPSHOT`。

本篇依据主干 CHANGELOG 的 Unreleased 一节，正式发布前内容可能还会变化。
:::

boot 主干已经依赖 core `0.2.0-SNAPSHOT`。用 boot 主干的项目已经在用这些变更。

## 破坏性变更

### 接口加密改为 SM4-GCM，必须配置密钥

core 去掉了内置密钥，接口加密改为 SM4-GCM。

- 没有配置 `MUGSUN_API_KEY` 时，应用默认拒绝启动。
- 密钥必须是 32 位 hex，或者带填充、解码后正好 16 字节的标准 base64。长度不对时直接报错，不会补零或截断。
- 密文格式改为 base64(IV 12 字节 ‖ 密文 ‖ 标签)。0.1.0 的 CBC 密文无法再解密，前后端必须一起升级。
- 解密失败统一返回「接口密文无效」。
- `encrypt(null)` 和 `decrypt(null)` 都返回 null，不再抛异常。

接口加密只是传输混淆，不防重放，也不绑定接口，不能代替 TLS。

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
| `mugsun.crypto.api-key` | 无 | 新增，对应环境变量 `MUGSUN_API_KEY`，必填 |
| `mugsun.crypto.allow-ephemeral-keys` | `false` | 新增，设为 true 时缺密钥会生成只在本进程内有效的临时密钥 |
| `mugsun.crypto.strict-keys` | `false` | 原有配置项，为 true 时连临时密钥也拒绝 |

临时密钥重启即变，多实例之间不互通，只能用于本地开发。

boot 的 `application-dev.yml` 已经打开了 `allow-ephemeral-keys`。

## 许可证

许可证从 Apache-2.0 改为 MIT。Maven Central 上已发布的 0.1.0 构件仍保留发布时声明的 Apache-2.0。

## 升级步骤

1. 生成密钥：

   ```bash
   openssl rand -hex 16
   ```

2. 在所有环境的环境变量或密钥管理里配置 `MUGSUN_API_KEY`。多实例必须用同一个密钥。
3. 把前端的接口加密改为 SM4-GCM 和新的密文格式，与后端同时上线。
4. 检查前端对重复提交的判断，从按 500 改为按 400。
5. 用达梦并且自带 `sql-error-codes.xml` 的项目，合并达梦的错误码条目。
6. 0.2.0 发布后，把依赖版本改为 `0.2.0`。

## 看效果

不配置 `MUGSUN_API_KEY`，也不打开 `allow-ephemeral-keys` 时启动应用，启动会失败，日志里有这样一行：

```text
未配置接口加密密钥 MUGSUN_API_KEY（32 位 hex 或带填充的 16 字节 base64），拒绝启动；仅本地开发可设 mugsun.crypto.allow-ephemeral-keys=true
```

配置密钥后，重复新增一条已经存在的数据。接口返回 HTTP 400，响应体的 `code` 是 400，`msg` 是「数据已存在，请勿重复提交」。

确认项目实际用的 core 版本：

```bash
mvn dependency:tree | grep com.mugsun
```
