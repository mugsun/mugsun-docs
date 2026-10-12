# Architecture

```
mugsun-track (SDK)
      │  /track/collect …
      ▼
mugsun-boot  ──modules──► core | track | gis | ai | server
      │
      ▼
mugsun-pc (admin: system / analytics / GIS / AI …)
```

| Repo | Role |
| --- | --- |
| core | BOM, Web/MyBatis starters |
| boot | Business + optional modules; compose entry |
| pc | Admin UI; OpenAPI `gen:api` |
| track | Browser SDK; npm `@mugsun/track-web` |

cloud and uniappx-ui are **planned**, outside the current free delivery boundary.

::: tip
Module toggles and local wiring details will land in a later revision.
:::
