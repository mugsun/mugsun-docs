# 升级指南

本章按版本说明怎么升级，每个版本一篇。内容以各仓的 tag、CHANGELOG、已发布的构件和 Flyway 迁移为准。

## 各仓的版本情况

下表是 2026-10-21 核对的结果。

| 仓库 | 已发布版本 | git tag | 主干版本 |
| --- | --- | --- | --- |
| mugsun-core | 0.1.0（Maven Central，2026-10-12） | `v0.1.0` | `0.2.0-SNAPSHOT`，未发布 |
| mugsun-track | 0.1.0（2026-08-19）、0.2.0（2026-10-13），均在 npm | 无 | 计划 0.3.0，未发布 |
| mugsun-boot | 无 | 无 | `0.2.0-SNAPSHOT`，CHANGELOG 中 0.1.0 标为开发中 |
| mugsun-pc | 无 | 无 | CHANGELOG 只有 Unreleased |

mugsun-track 的 CHANGELOG 里还有 0.1.1。这个版本没有发布到 npm，也没有 tag，可以直接从 0.1.0 升到 0.2.0。

## 各版本的升级说明

- [core 0.1.0 → 0.2.0](./core-0-2-0)：0.2.0 还没有发布，本篇依据主干的 CHANGELOG，发布前可能还会变化。
- [埋点 SDK 0.1.0 → 0.2.0](./track-web-0-2-0)：npm 上已发布的两个版本之间的升级。

boot 和管理台还没有发布过版本，所以没有按版本的升级说明。已经部署了 boot 主干的项目，更新到新的主干时请看下面两页：

- [后端升级指南](/boot/upgrade)：涉及 V7、V11 迁移和旧图形验证码的移除。
- [埋点模块升级](/track/upgrade)：涉及 T2 到 T4 迁移、UV 回填和时间线索引。

## 数据库迁移

core 不带数据库迁移。

boot 主库的 Flyway 迁移在 `mugsun-boot-core` 的 `db/migration` 下，openGauss 和达梦各有一套。

目前的版本号是 V1 到 V3、V7 到 V11，V4 到 V6 没有使用。

埋点库的迁移在 `mugsun-boot-track` 的 `db/track/migration` 下，版本号是 T1 到 T4。

其中 T4 是 Java 迁移。

## 看效果

用下面的命令可以自己核对各仓的 tag：

```bash
git ls-remote --tags https://github.com/mugsun/mugsun-core.git
git ls-remote --tags https://github.com/mugsun/mugsun-boot.git
```

core 只返回 `v0.1.0`，boot 不返回任何 tag。

埋点 SDK 在 npm 上的版本和发布时间可以这样查：

```bash
npm view @mugsun/track-web time --json
```

结果只有 `0.1.0` 和 `0.2.0` 两个版本。
