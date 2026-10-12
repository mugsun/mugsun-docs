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
| [core](/en/core/) | BOM, Web/MyBatis starters; local install required before boot build |
| [boot](/en/boot/) | Business + optional modules; compose for DB, Maven for the app |
| [pc](/en/pc/) | Admin UI; proxies to boot in dev; OpenAPI `gen:api` |
| [track](/en/track/) | Browser SDK; npm `@mugsun/track-web` |

Runtime flags (classes may still be on the classpath):

- `MUGSUN_GIS_ENABLED=false`
- `MUGSUN_TRACK_ENABLED=false`
- `MUGSUN_AI_ENABLED=false`

cloud and uniappx-ui are **planned**, outside the current free delivery boundary.

Next: [Getting started](/en/guide/getting-started) · [Boot configuration](/en/boot/configuration) · [First event](/en/track/first-event)
