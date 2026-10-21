# Brand guidelines

This page records how the mugsun logo is used. Source files are in `public/brand/svg/`.

## Theme color variants {#theme-variants}

The admin console offers 7 theme colors. Each theme color has a light-background version and a dark-background version of the logo. All versions keep the original glyph and light-arc shapes and change only the colors.

Light mode uses the light-background version, and dark mode uses the dark-background version. Any theme color outside these 7, including custom colors added later, always uses the original black-gold logo.

::: tip
Switching the logo by theme color is being implemented in the admin console. Until then, the admin console always shows the original black-gold logo.
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

The original black-gold logo:

![Original black-gold logo](/brand/svg/mugsun-icon-dark.svg){width=64}

The variant images are in `public/brand/themes/`, at 256×256, named
`mugsun-icon-<theme color>-onlight.png` and
`mugsun-icon-<theme color>-ondark.png`.

## Admin console sign-in pages {#pc-auth-pages}

The mugsun-pc login, register and forgot-password pages pick the logo by
the rules above:

- Light mode uses the light-background version of the current theme color,
  dark mode the dark-background version. Switching the theme color or
  light/dark from the top-right corner swaps the logo at once, without a
  reload. On narrow screens the color picker is hidden; only light/dark can
  be switched.
- A theme color outside the 7 presets uses the original black-gold logo in
  both modes.
- The light-background versions for orange `#F9901F` and pink `#FF80C8` get
  a 1px light-gray outline so they don't blend into light backgrounds.
- The "MUGSUN" wordmark is rendered live in Saira 600: `#1F2329` in light
  mode, white in dark mode.
- On desktop the icon is 32px tall with a 10px gap to the wordmark; at
  widths ≤640px the icon is 28px; below 360px only the icon shows.

The sidebar, header, lock screen and favicon keep the original logo and
don't follow the theme.
