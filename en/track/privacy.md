# Privacy

This page describes what the SDK actually does: what it collects by default, what it never collects, and what gets masked. Data is sent only to the backend that `endpoint` points to, never to a third party.

::: danger Tell users first, then collect
China's Personal Information Protection Law requires your privacy policy to tell users what is collected, what it is used for and how long it is kept. For sensitive personal information such as ID numbers, bank card numbers or location trails, separate consent is required as well.

This is the responsibility of whoever integrates the SDK. The SDK collects by default, which does not mean the user has agreed. Follow your legal counsel on the details.
:::

## Defaults

Since 0.3.0, replay shows original text, personal data in response bodies is uploaded as is, and every error is reported. If your pages show personal data, tighten things as described in [Turning on masking and filtering](#turning-on-masking-and-filtering).

| Item | Default behavior |
| --- | --- |
| Do Not Track | Respected. Nothing is collected when the browser has it on |
| Global Privacy Control | Ignored. Set `respectGpc: true` if your users are in a region that treats it as an opt-out request |
| User refusal | After `optOut()`, collection and replay stop and the local queue is cleared. `optIn()` resumes |
| Typed input | Auto-captured events never carry the value of an input |
| Session replay | Off. Once on, page text and input values are shown as they are |
| Response bodies | Not captured. Once on, personal data fields are uploaded as is, and credential fields always become `***` |
| Errors | All reported, including the ones already handled |
| Custom events | Reported as they are |

### Before you have consent

While the user has not agreed yet, there are three ways to go:

- Delay the call to `createTracker()` and initialize after consent.
- Initialize first, call `optOut()` right away, and call `optIn()` after consent. The refusal is stored locally and survives a reload.
- If you only want to avoid screen recording and response bodies, it is enough not to register `replayPlugin()` and to leave `apiBodyEnabled` off.

### What is never collected

No switch turns these on:

- Password fields. Neither auto-capture nor replay touches them.
- Elements with `data-track-mask`, and areas matched by `maskSelectors`.
- Inputs whose `autocomplete` is `cc-*` or `one-time-code` in replay, that is, bank card and verification code fields.
- Canvas content in replay.
- Response bodies of credential endpoints such as login, token issuing and sending verification codes; see [Plugins](/en/track/plugins#api-monitoring) for how they are detected.

## URL redaction

Every address the SDK reports has the values of sensitive parameters masked first, while business parameters stay:

```text
/api/order?id=42&token=abc      →   /api/order?id=42&token=***
/cb#access_token=abc            →   /cb#access_token=***
/#/login?code=abc               →   /#/login?code=***
```

The properties below all go through this step:

| Source | Properties |
| --- | --- |
| API monitoring | `url` of `api_request` |
| Shared properties | `referrer` |
| Auto-capture | `href` of a link |
| Errors | `resource_url` and `filename` |
| Page address in replay | The address recorded with each snapshot |
| DOM in replay | `href` `src` `srcset` `imagesrcset` `action` `xlink:href` `formaction` `poster` `data` |

`url_path` takes only the path, so it never has a query string or hash in the first place.

### Which keys are masked

Credential keys are masked in both addresses and response bodies:

```text
token  access_token  refresh_token  id_token  authorization  auth  jwt
api_key  apikey  x-api-key  secret  client_secret  private_key  access_key  secret_key
password  passwd  pwd  cookie  set-cookie  session  session_id  jsessionid
x-amz-signature  x-amz-security-token  x-goog-signature
```

The keys below are masked only in addresses. In response bodies they are often business fields, so their values are kept there:

```text
code  sign  signature  ticket  otp
sig  q-signature  x-oss-signature  x-oss-security-token  x-cos-security-token
```

Matching ignores case as well as `_` and `-`, so `accessToken` and `Refresh-Token` both count.

After ignoring those differences the key has to be exactly equal, so `tokenCount` and `sessionTimeout` are not masked.

### Places other than the query string

| Place | Handling |
| --- | --- |
| Parameters in the hash | Handled like query parameters, which covers the OAuth implicit flow and hash routing |
| Path parameters | `;jsessionid=…` becomes `;jsessionid=***` |
| User name and password in the address | `user:pass` in `https://user:pass@host/` becomes `***` |

The scheme, the host and the rest of the path are kept verbatim. Relative addresses are handled the same way.

### What is not covered

Addresses in the places below are not processed:

- CSS `url()` addresses in styles.
- `data-*` attributes.
- `srcdoc` of an `iframe` and `content` of a `meta`.
- Addresses that appear in page text.
- Tokens embedded in the path, such as `/reset/<token>`.
- Addresses with a backslash in the user name or password, and forms without `//` such as `https:u:p@h`.

If these places may carry tokens or signatures, add `data-track-mask` to the element so that replay skips the whole block.

`data-track-mask` has to be present when recording starts or when the element is inserted into the page. Adding it later cannot hide what was already recorded.

## Credential fields in response bodies

With response body capture on, the values of credential keys in the JSON always become `***`, whether `apiBodyMaskEnabled` is on or not. Key names are matched by the same rules as in addresses.

| Category | Keys | When they are masked |
| --- | --- | --- |
| Credentials | The first group above, such as `token` `password` `cookie` `session` | Always |
| Personal data | `phone` `mobile` `email` `idcard` `id_card` `bankcard` `bank_card` | When `apiBodyMaskEnabled: true` is set |
| Business fields | `code` `sign` `signature` `ticket` `otp` | Normally not |

Values of `code` and `ticket` that look like tokens are masked too. That means the shape of a JWT, or at least 16 characters with both letters and digits:

```text
{"code":0,"msg":"ok","data":{"sign":true,"ticket":1}}   →   uploaded as is
{"code":"E1001"}                                         →   uploaded as is
{"code":"INVALID_PARAMETER_VALUE"}                       →   uploaded as is
{"code":"SplxlOBeZQQYbYS6WxSbIA"}                        →   {"code":"***"}
```

| Case | Handling |
| --- | --- |
| Nested deeper than 8 levels | The deeper part becomes `***` as a whole and is never uploaded as is |
| The response is not JSON | Not captured, including HTML, plain text and binary |
| Declared as JSON but fails to parse | Not captured; the event is marked `body_skipped: 'unparsable'` |

Tokens under key names that are not on the list are not masked, for example `sessionKey` and `userToken`. If you have many such fields, turn `apiBodyEnabled` off.

## Turning on masking and filtering

By default nothing is masked or filtered. Turn things on one by one as shown below when you need them:

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // Phone numbers, emails and ID numbers in response bodies also become ***
  apiBodyMaskEnabled: true,
  // These areas are not auto-captured and not recorded in replay
  maskSelectors: ['.user-card', '#id-number'],
  // Rewrite or drop an event before it is queued
  beforeSend: (e) => {
    if (e.props?.phone) e.props.phone = '***'
    return e
  },
  plugins: [
    ...defaultPlugins(),
    apiMonitorPlugin(),
    // In replay, all text shows as * and every input value is masked
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
  ],
})
```

| Goal | What to use |
| --- | --- |
| Mask text in replay | `maskTextSelector`. Pass `'*'` to mask everything, or a selector such as `'.user-info'` to mask only part. Text in attributes is not covered, see [Options and masking](/en/track/plugins#options-and-masking) |
| Mask input values in replay | `maskAllInputs: true` |
| Keep a whole area out of replay and auto-capture | Add `data-track-mask` to the element, or put its selector in `maskSelectors` |
| Mask personal data in response bodies | `apiBodyMaskEnabled: true`, or turn on "Response body masking" in the admin console |
| Stop reporting errors that were already handled | `skipHandledErrors: true` |
| Rewrite or drop certain events | `beforeSend` |

`beforeSend` does not reach replay or response bodies; those two only have their own options from the table. To still count the API errors you skip, see [Error filtering and API failures](/en/track/install#error-filtering-and-api-failures).

```html
<!-- This block is not recorded in replay, and clicks inside it are not collected -->
<div data-track-mask>ID number: …</div>
```

## Upgrading from 0.2.0 and keeping the old masking

0.2.0 masked all text and input values in replay by default, and also masked personal data fields in response bodies. To keep that after upgrading, add two settings:

```ts
import { createTracker } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // The 0.2.0 default: phone numbers, emails and ID numbers also become ***
  apiBodyMaskEnabled: true,
  plugins: [
    // ...your existing plugins
    // The 0.2.0 default: mask all text and every input value
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
  ],
})
```

Check the admin console too. "Response body masking" in the application form is off by default, and when `apiBodyMaskEnabled` is not written in code, the SDK uses the backend value from its next start.

The default for error reporting has not changed; 0.2.0 reported everything as well. To skip errors that were already handled, add `skipHandledErrors: true`.

## View permissions and retention

Replay and response bodies are more sensitive than ordinary events, so each has its own view permission and retention period:

| Data | View permission | Retention |
| --- | --- | --- |
| Events | The permission of each analysis page | "Data retention period", 90 days by default |
| Session replay | `sys:track-replay:view` | "Replay retention", 14 days by default |
| Response bodies | `sys:track-user:view-body` | "Response body retention", 7 days by default |

Retention is set per application in the application form. Viewing a replay or a response body writes an operation log entry, so you can find out who looked.

## Compliance tips

- State what is collected in your privacy policy and give users a way to refuse that calls `optOut()`.
- Add `data-track-mask` to areas with personal data, or put them in `maskSelectors`.
- Decide whether you really need response body capture before turning it on. If bodies may carry personal data, turn on `apiBodyMaskEnabled`.
- Error messages may contain phone numbers, order numbers or backend exception text. Rewrite them with `beforeSend` when needed.
- Grant the view permissions for replay and response bodies only to the people who need them, and keep the retention as short as you can.
- Who may see the data and how long it is kept follow your company's rules.

<div class="ms-cards">

- [Plugins](/en/track/plugins) What each plugin collects, and how credential endpoints are detected.
- [Security checklist](/en/boot/security-checklist) Security settings to verify one by one before going live.

</div>
