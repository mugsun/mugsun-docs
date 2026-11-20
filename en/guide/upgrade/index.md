---
pageClass: ms-first-col-nowrap
---

# Upgrade guide

This chapter explains how to upgrade each repository. The content follows each repository's tags, CHANGELOG, published artifacts and database migrations.

## Versions by repository

The table below was checked on 2026-11-20.

| Repository | Released versions | git tag | Main branch version |
| --- | --- | --- | --- |
| mugsun-core | 0.1.0 (Maven Central, 2026-10-12) | `v0.1.0` | `0.2.0-SNAPSHOT`, not released |
| mugsun-track | 0.1.0 (2026-08-19), 0.2.0 (2026-10-13) and 0.3.0 (2026-10-22), all on npm | `v0.1.0` `v0.2.0` `v0.3.0` | `0.3.0`, released |
| mugsun-boot | none | none | `0.2.0-SNAPSHOT`; the CHANGELOG marks 0.1.0 as in development |
| mugsun-pc | none | none | the CHANGELOG has only Unreleased |

The mugsun-track CHANGELOG also lists 0.1.1. That version was never published to npm and has no tag, so you can upgrade from 0.1.0 straight to 0.2.0.

## Upgrade notes by version

- [core 0.1.0 → 0.2.0](./core-0-2-0): 0.2.0 is not released yet. This page follows the CHANGELOG on the main branch and may change before release.
- [Analytics SDK 0.1.0 → 0.2.0](./track-web-0-2-0): the upgrade between the first two versions on npm.
- [Analytics SDK 0.2.0 → 0.3.0](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking): 0.3.0 changed the privacy defaults, so read this section before you upgrade.

boot and the admin console have never been released, so they have no per-version upgrade notes. If you already run the boot main branch, read these two pages when you move to a newer main:

- [Backend upgrade guide](/en/boot/upgrade): changed permission codes, migrations V7 and V11, and the removal of the legacy digit captcha.
- [Tracking module upgrade](/en/track/upgrade): the historical UV backfill, the user timeline indexes and the cleanup of old migration records.

## Database migrations

core has no database migrations.

The Flyway migrations of the boot main database are under `db/migration` in `mugsun-boot-core`, with separate sets for openGauss and Dameng.

The versions in use are V1 to V3, V7 to V11 and V13 to V22. The numbers in between are not used.

The tracking database migrations are under `db/track/migration` in `mugsun-boot-track`, versions T1 to T5.

V17 on PostgreSQL and T4 of the tracking database are Java migrations. The rest are SQL scripts.

## Check the versions

You can check each repository's tags yourself:

```bash
git ls-remote --tags https://github.com/mugsun/mugsun-core.git
git ls-remote --tags https://github.com/mugsun/mugsun-boot.git
```

core returns only `v0.1.0`, and boot returns no tags.

The analytics SDK versions and release times on npm:

```bash
npm view @mugsun/track-web time --json
```

The result lists three versions: `0.1.0`, `0.2.0` and `0.3.0`.
