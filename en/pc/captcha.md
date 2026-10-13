# Behavior captcha

Login, registration, password reset and SMS sending in the admin console use a behavior captcha. There are five types: slider (SLIDER), rotate (ROTATE), word click (WORD_CLICK), icon click (ICON_CLICK) and jigsaw (JIGSAW, 2×2).

The server issues and checks every challenge. The server also picks the type: on each request it chooses one at random from the tenant's enabled types, and the client cannot choose. For server settings, see [Configuration](/en/boot/configuration).

## Frontend behavior

- The page first calls `GET /api/auth/captcha/config` to check whether a captcha is needed. The `type` it returns is only a hint; the type in the `challenge` response is the one that counts. If the frontend gets a type it does not recognize, it falls back to the legacy numeric captcha.
- `CaptchaDialog` switches to the slider, rotate, click or jigsaw panel based on `type`. On success it gets a one-time `captchaToken`, which is sent with the business request.
- All coordinates are in display pixels, with the origin at the top-left corner of the background image. The server converts them back with `bgWidth / bgDisplayWidth`. The reported `bgDisplayWidth` is at least 260: when the container is narrower than 260px, the dialog is scaled down as a whole and a smaller width is never reported.
- For rotate challenges, the slider track is as wide as the image. Travel is measured from the handle's left edge, and dragging to the far right equals 360°.
- For click challenges, click the 3 targets in the order shown. Each click shows a numbered marker; click a marker to undo it. The answer is submitted automatically after the third click.
- For jigsaw challenges, click two tiles to swap them (dragging also swaps), then press "Done" once the image is restored.

## Keyboard

"Use keyboard" fetches a new challenge. In keyboard mode only slider or rotate challenges are issued. Use ←/→ to adjust, hold Shift for bigger steps, and press Enter to submit. For rotate challenges, each key press turns the image by the server's `keyboardStep` degrees.

If the tenant has enabled neither slider nor rotate, the keyboard challenge request returns `40015`. The dialog then asks the user to switch to mouse or touch and shows a "Use mouse / touch" button. It does not retry automatically.

## Errors

| Code | Frontend handling |
| --- | --- |
| 40010 | Expired; a new challenge loads automatically |
| 40011 | Failed; the panel shakes and a new challenge loads automatically (its type may change). A dropped verify connection is also treated as 40011 |
| 40012 | Locked after too many failures; counts down from `retryAfter`, and the captcha cannot be used until the countdown ends |
| 40014 | No captcha needed right now; the business request is submitted directly |
| 40015 | No keyboard-accessible type is enabled; the user is asked to use mouse or touch |

## Development mock

To work on the UI without a backend, start in mock mode. Set the variable on the command line only; do not put it in a `.env` file:

```bash
VITE_CAPTCHA_MOCK=true pnpm dev
```

- Add `?captchaType=ROTATE` to the URL to force a type (mock mode only).
- Set `sessionStorage.captchaMockNoKeyboard = '1'` to simulate 40015.

The mock is loaded only in `DEV` mode with `VITE_CAPTCHA_MOCK=true`, and production builds do not include it. The mock's rotate tolerance is wider than the server's, so the server's result is what counts. Screenshots or recordings made in mock mode must be labelled "frontend mock, server verification not connected".
