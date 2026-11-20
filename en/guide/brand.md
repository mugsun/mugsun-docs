---
pageClass: ms-first-col-nowrap
---

# Brand guidelines

This page lists every version of the mugsun logo, says where each one is used, and explains how the admin console switches the logo by theme color.

The source files are under `public/brand/` in the docs repository. Click a file name in the table below to open or download it.

## Logo files {#logo-files}

| File | Preview | Where it is used |
| --- | --- | --- |
| [`mugsun-icon-dark.svg`](/brand/svg/mugsun-icon-dark.svg) | ![Original black-gold logo](/brand/svg/mugsun-icon-dark.svg){width=56} | The original black-gold logo, shown in the sidebar and header of the admin console |
| [`mugsun-icon-simple-small.svg`](/brand/svg/mugsun-icon-simple-small.svg) | ![Small-size icon](/brand/svg/mugsun-icon-simple-small.svg){width=56} | A simplified version with heavier strokes, used as the browser tab icon of this site |
| [`mugsun-lockup-light.svg`](/brand/svg/mugsun-lockup-light.svg) | ![Horizontal logo on a light background](/brand/svg/mugsun-lockup-light.svg){width=168} | Icon plus wordmark in a row, white background, for light surfaces |
| [`mugsun-lockup-dark.svg`](/brand/svg/mugsun-lockup-dark.svg) | ![Horizontal logo on a dark background](/brand/svg/mugsun-lockup-dark.svg){width=168} | The same layout with a black background, for dark surfaces |
| [`mugsun-ms-mark-black.svg`](/brand/svg/mugsun-ms-mark-black.svg) | ![Black MS mark](/brand/svg/mugsun-ms-mark-black.svg){width=76 style="background:#fff;padding:10px 12px;border-radius:6px"} | The letters MS only, in black, for light surfaces |
| [`mugsun-ms-mark-white.svg`](/brand/svg/mugsun-ms-mark-white.svg) | ![White MS mark](/brand/svg/mugsun-ms-mark-white.svg){width=76 style="background:#1b1b1f;padding:10px 12px;border-radius:6px"} | The letters MS only, in white, for dark surfaces |
| [`mugsun-wordmark-black.svg`](/brand/svg/mugsun-wordmark-black.svg) | ![Black wordmark](/brand/svg/mugsun-wordmark-black.svg){width=150 style="background:#fff;padding:10px 12px;border-radius:6px"} | The MUGSUN wordmark only, in black, for light surfaces |

## Theme color variants {#theme-variants}

The admin console offers 7 theme colors, and each has a light-background version and a dark-background version of the logo. All versions keep the original glyph and light-arc shapes and change only the colors.

Light mode uses the light-background version, and dark mode uses the dark-background version. Any theme color outside these 7, including custom colors added later, always uses the original black-gold logo.

::: tip Only the sign-in pages switch the logo
In the admin console, only the sign-in, sign-up and forgot-password pages switch the logo by theme color. See [Sign-in pages of the admin console](#pc-auth-pages).
:::

| Theme color | Light background (light mode) | Dark background (dark mode) |
| --- | --- | --- |
| Blue `#5D87FF` | ![Light-background version #5D87FF](/brand/themes/mugsun-icon-5d87ff-onlight.png){width=64} | ![Dark-background version #5D87FF](/brand/themes/mugsun-icon-5d87ff-ondark.png){width=64} |
| Purple `#B48DF3` | ![Light-background version #B48DF3](/brand/themes/mugsun-icon-b48df3-onlight.png){width=64} | ![Dark-background version #B48DF3](/brand/themes/mugsun-icon-b48df3-ondark.png){width=64} |
| Bright Blue `#1D84FF` | ![Light-background version #1D84FF](/brand/themes/mugsun-icon-1d84ff-onlight.png){width=64} | ![Dark-background version #1D84FF](/brand/themes/mugsun-icon-1d84ff-ondark.png){width=64} |
| Green `#60C041` | ![Light-background version #60C041](/brand/themes/mugsun-icon-60c041-onlight.png){width=64} | ![Dark-background version #60C041](/brand/themes/mugsun-icon-60c041-ondark.png){width=64} |
| Sky `#38C0FC` | ![Light-background version #38C0FC](/brand/themes/mugsun-icon-38c0fc-onlight.png){width=64} | ![Dark-background version #38C0FC](/brand/themes/mugsun-icon-38c0fc-ondark.png){width=64} |
| Orange `#F9901F` | ![Light-background version #F9901F](/brand/themes/mugsun-icon-f9901f-onlight.png){width=64} | ![Dark-background version #F9901F](/brand/themes/mugsun-icon-f9901f-ondark.png){width=64} |
| Pink `#FF80C8` | ![Light-background version #FF80C8](/brand/themes/mugsun-icon-ff80c8-onlight.png){width=64} | ![Dark-background version #FF80C8](/brand/themes/mugsun-icon-ff80c8-ondark.png){width=64} |

The variant images are in `public/brand/themes/`, at 256×256.

The file names are `mugsun-icon-<color>-onlight.png` and `mugsun-icon-<color>-ondark.png`, with the color written in lowercase hex.

## Sign-in pages of the admin console {#pc-auth-pages}

The sign-in, sign-up and forgot-password pages of the admin console show the logo by the rules above:

- Light mode uses the light-background version of the current theme color, and dark mode uses the dark-background version.
- When you switch the theme color or light and dark mode in the top-right corner, the logo changes at once without a reload. Narrow screens hide the color picker, so you can only switch light and dark mode.
- A theme color outside the 7 presets uses the original black-gold logo in both modes.
- The light-background versions for orange `#F9901F` and pink `#FF80C8` get a 1px light-gray outline so that they do not blend into light backgrounds.
- The "MUGSUN" wordmark is rendered live in Saira 600. It is `#1F2329` in light mode and white in dark mode.
- On desktop the icon is 32px tall with a 10px gap to the wordmark. At widths up to 640px the icon is 28px tall, and below 360px only the icon shows.

The sidebar, header, lock screen and browser tab icon keep the original logo and do not follow the theme.

## Other assets {#other-assets}

Locations in the table are relative to `public/brand/`.

| Asset | Location | Notes |
| --- | --- | --- |
| Repository banners | `banners/repos/` | One Chinese and one English banner per repository, 1280×320, plus double-size `@2x` versions |
| Social card image | `banners/github-og-1200x630.png` | 1200×630, shown when a link to the docs site is shared |
| Site icons | `web/` | `favicon.ico`, `favicon.svg` and a 180×180 `apple-touch-icon.png` |
| Font license | `LICENSE-Saira-OFL.txt` | The Saira font used for the wordmark is licensed under the SIL Open Font License 1.1 |
