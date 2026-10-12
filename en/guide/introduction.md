# Introduction

mugsun is a **self-hosted** admin foundation for small teams: multi-tenant tenancy, SM crypto & audit, and embedded product analytics (SDK → ingest → dashboard), with GIS / AI as optional modules.

## What it is

- [mugsun-boot](https://github.com/mugsun/mugsun-boot) — JDK 21 + Spring Boot 3.5 (core / gis / track / ai modules)
- [mugsun-pc](https://github.com/mugsun/mugsun-pc) — Vue 3 + TypeScript + Element Plus
- [mugsun-track](https://github.com/mugsun/mugsun-track) — pluginized web SDK (core gzip target ≤ 8KB)
- [mugsun-core](https://github.com/mugsun/mugsun-core) — BOM and starters

## What it is not

- Not a kitchen-sink low-code platform
- Not a hosted analytics SaaS (you take the pipeline with you)
- **cloud** and **uniappx-ui** are *planned*—this site will not pretend they ship as open install guides today

## How it differs

Instead of a feature-wall checklist, mugsun emphasizes one verifiable slice: **SDK → ingest → dashboard**, with security defaults (secrets, redaction, replay masking) documented up front.

See [Architecture](/en/guide/architecture). To run locally: [Getting started](/en/guide/getting-started).
