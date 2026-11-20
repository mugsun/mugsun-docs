# Behavioral captcha

Before sign-in, registration, password reset and SMS codes, the admin console shows a behavioral captcha. The request is sent only after the user solves it.

This page covers what users see, how to solve each challenge type, and how the page reacts to errors. For the server-side rules, see [Behavioral captcha](/en/boot/captcha) in the backend docs.

![The Security Check dialog opened by the Login button on the sign-in page, showing a slider puzzle](/screenshots/pc/captcha-dialog.png)

## When it appears

| Page | Button that opens it |
| --- | --- |
| Sign-in page, Account Login tab | Login |
| Sign-in page, SMS Login tab | Send Code |
| Registration page | Register |
| Forgot password page | Send Code |

- When the page loads, it asks the backend whether this scene needs a captcha. If not, the button submits right away and no dialog opens.
- The backend picks the challenge type at random. The page cannot choose.
- After a correct answer the dialog closes by itself and the original action is submitted.
- If the user closes the dialog, the action is not submitted.

## How to solve the five types

| Type | What to do | When it is submitted |
| --- | --- | --- |
| Slider puzzle | Drag the slider to the right until the piece covers the gap | On release |
| Rotate | Drag the slider until the round picture in the middle is upright | On release |
| Word click | Click the characters in the picture in the order shown in the prompt | After the last click |
| Icon click | Click the icons in the picture in the order shown in the prompt | After the last click |
| Jigsaw | Click two tiles to swap them until the picture is restored | On Done |

- For rotate challenges, dragging the slider all the way to the right equals one full turn.
- A very slow drag on a rotate challenge switches to fine-tuning: the picture turns at 0.6× the usual rate, which makes it easier to line up.
- Each click on a click challenge leaves a numbered marker. Clicking a marker undoes that click and every click after it.
- The Undo button on a click challenge removes the last click.
- On a jigsaw you can also drag one tile onto another to swap them. Done is enabled after at least one swap.
- New puzzle in the bottom-right corner loads another challenge, possibly of a different type.

## Keyboard only {#keyboard}

Use keyboard in the bottom-left corner loads a challenge that can be solved with the keyboard. Keyboard mode only issues slider puzzle and rotate challenges.

| Key | What it does |
| --- | --- |
| `←` `→` | Move the piece or turn the picture, one step per press |
| `Shift` with `←` `→` | Ten steps per press |
| `Enter` | Submit |

- The backend returns the step size with each challenge. By default a slider step is 4 pixels of the original image and a rotate step is 5°.
- Pressing an arrow key on a slider or rotate challenge in mouse mode switches to keyboard mode and loads a new challenge.
- In keyboard mode, dragging the slider with the mouse or choosing Use mouse / touch switches back to mouse mode and loads a new challenge.
- If the tenant has enabled neither slider puzzle nor rotate, keyboard mode has nothing to issue, and the dialog asks the user to use a mouse or touch screen.

## How the page reacts to errors {#errors}

| Situation | Code | What the page does |
| --- | --- | --- |
| Wrong answer | `40011` | Shows "Please try again", shakes the dialog, then loads a new challenge |
| Challenge expired | `40010` | Loads a new challenge; it does not count as a failure |
| Too many failures | `40012` | Shows a countdown during which nothing can be done, then loads a new challenge |
| No captcha needed this time | `40014` | Closes the dialog and submits |
| No challenge that works with a keyboard | `40015` | Asks the user to use a mouse or touch screen; no automatic retry |
| Challenge type unavailable | `40016` | Asks the user to contact the administrator; no automatic retry |
| The backend still asks for a captcha after submit | `40013` | Opens the captcha again, once |
| Network or other errors | none | Shows "Failed to load. Check your network" with a Retry button |

- A challenge expires after 120 seconds by default. The page loads a new one when the time is up.
- The countdown uses `retryAfter` from the backend, or 60 seconds when it is missing.
- A verify request that is cut off is treated as a wrong answer.
- If the backend returns a type the page does not know, the dialog shows "Verification is temporarily unavailable. Please contact the administrator."

For what each code means on the server, see [Error codes](/en/boot/captcha#error-codes).

### The captcha fails to load {#config-error}

If the page cannot find out whether a captcha is needed, the form shows a notice with a Retry button and an error ID.

- The error ID is the `X-Trace-Id` of that request, so you can find the request in the backend logs.
- The Login, Register and Send Code buttons are disabled in this state. The page never submits without the captcha.
- A setting with a type the page does not know is handled the same way.
- The notice is shown inside the form, not as a pop-up message. Screen readers announce it once.

## Settings per tenant {#tenant}

The platform super admin can turn the captcha on or off for each tenant, or keep only some of the types.

Open Tenant Operations → Tenants, click Captcha in a row, and change the settings in the Captcha settings dialog.

| Field | Description |
| --- | --- |
| Enable captcha | When off, this tenant no longer requires a captcha |
| Enabled types | The types this tenant can get. Leave all unchecked to use the platform default types |

- Some combinations are saved with a warning from the backend, for example when only Rotate (auxiliary) is checked.
- When there is a warning, the dialog stays open and shows it under "Saved, with a warning".
- SMS codes ignore the tenant setting and follow the global switch only.
- The UI language does not affect which type is issued. The English UI also gets word-click challenges, and the word in the prompt is Chinese.
- The dialog says "The English UI never shows word click". That no longer matches the backend; the previous item is correct.

For the global switch and the parameters, see [Settings](/en/boot/captcha#settings) in the backend docs. Read the warning under [Tenant switch](/en/boot/captcha#tenant-switch) before turning the captcha off.

## Changing this code {#code}

| File | Purpose |
| --- | --- |
| `src/hooks/core/useCaptchaGate.ts` | Decides whether to open the captcha and wraps the request to submit |
| `src/components/core/captcha/CaptchaDialog.vue` | The dialog: fetches, verifies and replaces challenges, and shows the messages |
| `src/components/core/captcha/*Panel.vue` | Four panels: slider, rotate, click and jigsaw |
| `src/components/core/captcha/CaptchaConfigError.vue` | The load-failure notice in the form |
| `src/utils/captcha/` | Coordinate conversion, keyboard steps and error classification |
| `src/api/captcha.ts` | The requests for the three endpoints |

- The image is displayed between 260 and 320 pixels wide. On narrower screens the whole dialog is scaled down and the reported width stays at 260.
- Coordinates are reported in display pixels from the top-left corner of the image, and the backend converts them back to original pixels.
- A correct answer returns a one-time `captchaToken`, which `useCaptchaGate` puts into the request that follows.

### Use it in your own form {#usage}

This is how the sign-in page uses it. For another form, change the scene name and `fetchLogin`.

```vue
<script setup lang="ts">
  import CaptchaDialog from '@/components/core/captcha/CaptchaDialog.vue'
  import CaptchaConfigError from '@/components/core/captcha/CaptchaConfigError.vue'
  import { useCaptchaGate, isCaptchaCancelled } from '@/hooks/core/useCaptchaGate'

  const gate = useCaptchaGate('login', { tenantId: () => form.tenantId })
  onMounted(() => gate.loadConfig())

  async function submit() {
    try {
      await gate.run((captchaToken) => fetchLogin({ ...form, captchaToken }))
    } catch (error) {
      if (isCaptchaCancelled(error)) return
      throw error
    }
  }
</script>

<template>
  <CaptchaConfigError :gate="gate" scene="login" />
  <ElButton :disabled="!gate.ready.value" @click="submit">Login</ElButton>
  <CaptchaDialog
    v-model:visible="gate.visible.value"
    scene="login"
    :client-id="gate.clientId"
    :tenant-id="gate.tenantId.value"
    @success="gate.onSuccess"
    @skip="gate.onSkip"
    @close="gate.onClose"
  />
</template>
```

- There are only four scenes: `login`, `register`, `sms` and `forget`.
- When the user closes the dialog, `run` throws an error that `isCaptchaCancelled` recognizes. Just return.
- When the form is submitted before the captcha is ready, `run` throws an error that `isCaptchaNotReady` recognizes.

## Debug the UI without a backend {#mock}

To look at the captcha UI only, let the page issue and check the challenges itself. No backend is needed.

```bash
VITE_CAPTCHA_MOCK=true pnpm dev
```

Set this variable on the command line only, not in a `.env` file. It only works in the dev server, and the production build does not contain this code.

| What to see | What to set in the browser |
| --- | --- |
| A specific type | Add `?captchaType=ROTATE` to the URL |
| No challenge that works with a keyboard | `sessionStorage.captchaMockNoKeyboard = '1'` |
| The captcha fails to load | `sessionStorage.captchaMockConfig = 'error'` |
| A type the page does not know | `sessionStorage.captchaMockConfig = 'unknown'` |
| The word used by word click | `sessionStorage.captchaMockWord`, set to a word of 3 or 4 characters |
| The rotate tolerance | `sessionStorage.captchaMockRotateTol = '7'`, 10 by default |

- The mock follows these rules: one verification per challenge, expiry after 120 seconds, and a 10-second lock after 5 wrong answers in a row.
- The mock tolerance is ±8 pixels for the slider puzzle and ±10° for rotate.
- The mock is only for looking at the UI. Whether an answer is right is decided by the backend.

## Next steps

<div class="ms-cards">

- [Behavioral captcha (backend)](/en/boot/captcha) Types, endpoints, settings, and the assets to replace before going live.
- [Tenants and plans](/en/boot/tenant/manage) Create a tenant and set its account limit and expiry time.
- [Local development](/en/pc/development#e2e) Two end-to-end suites, one with the captcha on and one with it off.
- [Security checklist](/en/boot/security-checklist) Go through it item by item before going live.

</div>
