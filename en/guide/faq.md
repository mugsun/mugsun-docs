# FAQ

**Is there a live demo?**  
Not yet. Use [Getting started](/en/guide/getting-started). See [Demo](/en/demo).

**What is mugsun’s positioning?**  
A full-stack platform focused on embedded analytics plus optional GIS/AI—not a feature-wall low-code suite. Do not market “compatible with / drop-in replacement for” commercial kits.

**How do I install cloud / uniappx-ui / ms-ui?**  
cloud remains planned (no install guide). **ms-ui** is the uni-app x cross-platform UI kit (not the PC admin); docs: [ms-ui](/en/uniappx/). The `mugsun-uniappx-ui` source repo is currently private.

**Does replay capture on-screen text by default?**  
The product goal is privacy-safe defaults (masking, redaction, DNT). See [Privacy](/en/track/privacy).

**Licenses?**  
boot/core Apache-2.0; pc/track mostly MIT (pc derives from art-design-pro—keep NOTICE). Always trust each repo’s LICENSE file.

**Does compose start the app too?**  
No. Boot’s `docker compose` starts PostgreSQL and Redis only; the app runs via Maven / JAR. See [Getting started](/en/guide/getting-started).
