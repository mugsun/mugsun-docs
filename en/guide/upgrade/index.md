---
pageClass: ms-first-col-nowrap
---

# Upgrade guide

This chapter explains how to upgrade each repository. The content follows each repository's tags, CHANGELOG, published artifacts and database migrations.

## Versions by repository

The table below was checked on 2026-11-21.

| Repository | Released versions | git tag | Main branch version |
| --- | --- | --- | --- |
| mugsun-core | 0.1.0 (Maven Central, 2026-10-12) | `v0.1.0` | `0.2.0-SNAPSHOT`, not released |
| mugsun-track | 0.1.0 (2026-08-19), 0.2.0 (2026-10-13) and 0.3.0 (2026-10-22), all on npm | `v0.1.0` `v0.2.0` `v0.3.0` | `0.3.0`, released |
| mugsun-boot | none | none | `0.2.0-SNAPSHOT`; the CHANGELOG marks 0.1.0 as in development |
| mugsun-cloud | none | none | `0.2.0-SNAPSHOT`; the CHANGELOG has only Unreleased |
| mugsun-pc | none | none | the CHANGELOG has only Unreleased |

The mugsun-track CHANGELOG also lists 0.1.1. That version was never published to npm and has no tag, so you can upgrade from 0.1.0 straight to 0.2.0.

## Upgrade notes by version

- [core 0.1.0 → 0.2.0](./core-0-2-0): 0.2.0 is not released yet. This page follows the CHANGELOG on the main branch and may change before release.
- [Analytics SDK 0.1.0 → 0.2.0](./track-web-0-2-0): the upgrade between the first two versions on npm.
- [Analytics SDK 0.2.0 → 0.3.0](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking): 0.3.0 changed the privacy defaults, so read this section before you upgrade.

boot, cloud and the admin console have never been released, so they have no per-version upgrade notes. If you already run the boot main branch, read these two pages when you move to a newer main:

- [Backend upgrade guide](/en/boot/upgrade): first how to rebuild the database after the migrations were merged into one baseline, then changed permission codes, migrations V7 and V11, and the removal of the legacy digit captcha.
- [Tracking module upgrade](/en/track/upgrade): the historical UV backfill, the user timeline indexes and the cleanup of old migration records.

## Database migrations

core has no database migrations.

cloud uses the same migration scripts as boot. The system service runs the ones for the main database, and the track service runs the ones for the tracking database.

The Flyway migrations of the boot main database are under `db/migration` in `mugsun-boot-core`, with separate sets for openGauss and Dameng.

Each set now has a single SQL baseline, `V1__baseline_0_2.sql`, which is the old V1 to V22 concatenated in version order.

The tracking database migrations are under `db/track/migration` in `mugsun-boot-track`.

The tracking baseline is `T1__baseline_0_2.sql`, concatenated from the old T1 to T5.

V17 on PostgreSQL and T4 of the tracking database are Java migrations and run separately, after the baseline. Scripts added later start at V18 for the main database and at T5 for the tracking database.

A database created by a main from before the merge cannot be updated in place and has to be rebuilt, see the [backend upgrade guide](/en/boot/upgrade#baseline).

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
