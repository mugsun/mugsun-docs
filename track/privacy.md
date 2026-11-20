# 隐私与合规

这一页写的是 SDK 实际怎么做：默认采集什么，从不采集什么，哪些内容会被遮掉。数据只发到 `endpoint` 指向的后端，不发给第三方。

::: danger 先告知，再采集
《个人信息保护法》要求在隐私政策里告诉用户采集什么、做什么用、保留多久。涉及身份证号、银行卡号、行踪这类敏感个人信息时，还要取得单独同意。

这是接入方的责任。SDK 默认就会采集，不代表用户已经同意，具体做法以法务意见为准。
:::

## 默认行为

从 0.3.0 起，回放默认显示原文，响应体里的个人信息原样上传，错误全部上报。页面上有个人信息时，按[开启遮罩与过滤](#开启遮罩与过滤)收紧。

| 项目 | 默认行为 |
| --- | --- |
| Do Not Track | 尊重。浏览器开了就不采集 |
| Global Privacy Control | 不看。用户所在地区把它视为退出请求时，设 `respectGpc: true` |
| 用户拒绝 | `optOut()` 后停止采集和回放，并清空本地队列。`optIn()` 恢复 |
| 输入内容 | 自动采集的事件从不带输入框的值 |
| 会话回放 | 关。打开后页面文字和输入框的值显示原文 |
| 响应体 | 不采集。打开后个人信息字段原样上传，凭证字段始终换成 `***` |
| 错误 | 全部上报，包括已经处理过的 |
| 自定义事件 | 原样上报 |

### 取得同意之前

用户还没同意时，有三种做法：

- 推迟调用 `createTracker()`，同意后再初始化。
- 先初始化，紧接着调用 `optOut()`，同意后调用 `optIn()`。拒绝状态存在本地，刷新后还在。
- 只是不想录屏和采响应体的话，不注册 `replayPlugin()`、不开 `apiBodyEnabled` 就够了。

### 始终不采集的内容

下面这些没有开关可以打开：

- 密码框。自动采集和回放都不碰。
- 带 `data-track-mask` 的元素，以及 `maskSelectors` 命中的区域。
- 回放里 `autocomplete` 是 `cc-*` 或 `one-time-code` 的输入框，也就是银行卡和验证码字段。
- 回放里的 canvas 画面。
- 登录、取令牌、发验证码这类凭证接口的响应体，判定规则见[插件](/track/plugins#接口监控)。

## URL 敏感参数

SDK 上报的地址都先遮掉敏感参数的值，业务参数留着：

```text
/api/order?id=42&token=abc      →   /api/order?id=42&token=***
/cb#access_token=abc            →   /cb#access_token=***
/#/login?code=abc               →   /#/login?code=***
```

下面这些属性都经过这一步：

| 来源 | 属性 |
| --- | --- |
| 接口监控 | `api_request` 的 `url` |
| 公共属性 | `referrer` |
| 自动采集 | 链接的 `href` |
| 错误 | `resource_url` 和 `filename` |
| 回放的页面地址 | 每次快照记下的地址 |
| 回放的 DOM | `href` `src` `srcset` `imagesrcset` `action` `xlink:href` `formaction` `poster` `data` |

`url_path` 只取路径，本来就不带查询参数和 hash。

### 哪些键会被遮

凭证键在地址和响应体里都遮：

```text
token  access_token  refresh_token  id_token  authorization  auth  jwt
api_key  apikey  x-api-key  secret  client_secret  private_key  access_key  secret_key
password  passwd  pwd  cookie  set-cookie  session  session_id  jsessionid
x-amz-signature  x-amz-security-token  x-goog-signature
```

下面这些键只在地址里遮。它们在响应体里常常是业务字段，所以响应体里保留原值：

```text
code  sign  signature  ticket  otp
sig  q-signature  x-oss-signature  x-oss-security-token  x-cos-security-token
```

匹配时不分大小写，也忽略 `_` 和 `-`，所以 `accessToken` 和 `Refresh-Token` 都算。

忽略这些差别以后要完全相等才算，`tokenCount` 和 `sessionTimeout` 不会被遮。

### 查询参数以外的位置

| 位置 | 处理 |
| --- | --- |
| hash 里的参数 | 和查询参数一样处理，照顾到 OAuth 隐式流程和 hash 路由 |
| 路径参数 | `;jsessionid=…` 变成 `;jsessionid=***` |
| 地址里的用户名和密码 | `https://user:pass@host/` 里的 `user:pass` 变成 `***` |

协议、主机和路径的其余部分逐字保留。相对地址同样处理。

### 遮不到的地方

下面这些位置的地址不处理：

- 样式里 CSS `url()` 的地址。
- `data-*` 属性。
- `iframe` 的 `srcdoc` 和 `meta` 的 `content`。
- 页面文字里出现的地址。
- 嵌在路径里的令牌，比如 `/reset/<token>`。
- 用户名或密码里带反斜杠的地址，以及 `https:u:p@h` 这种缺 `//` 的写法。

这些位置可能带令牌或签名时，给对应的元素加 `data-track-mask`，回放里整块不录。

`data-track-mask` 要在开始录制或元素插入页面时就已经在。事后再加，已经录下的内容遮不回去。

## 响应体中的凭证字段

打开响应体采集后，JSON 里凭证键的值始终换成 `***`，和 `apiBodyMaskEnabled` 开没开无关。键名的匹配规则和地址里的一样。

| 类别 | 键 | 什么时候遮 |
| --- | --- | --- |
| 凭证 | 上面的第一组，如 `token` `password` `cookie` `session` | 始终 |
| 个人信息 | `phone` `mobile` `email` `idcard` `id_card` `bankcard` `bank_card` | 设了 `apiBodyMaskEnabled: true` 时 |
| 业务字段 | `code` `sign` `signature` `ticket` `otp` | 一般不遮 |

`code` 和 `ticket` 的值像令牌时也会遮。像令牌指的是 JWT 的形状，或者长度不少于 16、同时有字母和数字：

```text
{"code":0,"msg":"ok","data":{"sign":true,"ticket":1}}   →   原样上传
{"code":"E1001"}                                         →   原样上传
{"code":"INVALID_PARAMETER_VALUE"}                       →   原样上传
{"code":"SplxlOBeZQQYbYS6WxSbIA"}                        →   {"code":"***"}
```

| 情况 | 处理 |
| --- | --- |
| 嵌套超过 8 层 | 更深的部分整体换成 `***`，不会原样上传 |
| 响应不是 JSON | 不采集，包括 HTML、纯文本和二进制 |
| 声明是 JSON 但解析失败 | 不采集，事件上标 `body_skipped: 'unparsable'` |

键名不在清单里的令牌遮不到，比如 `sessionKey` 和 `userToken`。这类字段多的时候，把 `apiBodyEnabled` 关掉。

## 开启遮罩与过滤

默认什么都不遮、不过滤。需要时按下面的写法逐项打开：

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // 响应体里的手机号、邮箱、证件号也换成 ***
  apiBodyMaskEnabled: true,
  // 这些区域不自动采集，也不录进回放
  maskSelectors: ['.user-card', '#id-number'],
  // 事件入队前改写或丢弃
  beforeSend: (e) => {
    if (e.props?.phone) e.props.phone = '***'
    return e
  },
  plugins: [
    ...defaultPlugins(),
    apiMonitorPlugin(),
    // 回放里文字全部显示成 *，输入框的值全部遮掉
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
  ],
})
```

| 想做的事 | 用什么 |
| --- | --- |
| 回放里遮掉文字 | `maskTextSelector`。传 `'*'` 全遮，也可以传 `'.user-info'` 这样的选择器只遮一部分。属性里的文字不在其内，见[选项和遮罩](/track/plugins#选项和遮罩) |
| 回放里遮掉输入框的值 | `maskAllInputs: true` |
| 整块区域不录，也不自动采集 | 元素上加 `data-track-mask`，或者把选择器写进 `maskSelectors` |
| 响应体里遮掉个人信息 | `apiBodyMaskEnabled: true`，或者在后台打开「响应体脱敏」 |
| 不上报已经处理过的错误 | `skipHandledErrors: true` |
| 改写或丢弃某些事件 | `beforeSend` |

`beforeSend` 管不到回放和响应体，这两类数据只能用表里各自的选项。跳过的接口错误还想统计的话，见[错误过滤与接口失败](/track/install#错误过滤与接口失败)。

```html
<!-- 这一块在回放里不录，里面的点击也不采集 -->
<div data-track-mask>身份证号：…</div>
```

## 从 0.2.0 升级、保留原来的遮罩

0.2.0 默认遮住回放里的全部文字和输入值，也遮响应体里的个人信息字段。升级后想保持原样，加两处配置：

```ts
import { createTracker } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // 0.2.0 的默认值：手机号、邮箱、证件号也换成 ***
  apiBodyMaskEnabled: true,
  plugins: [
    // ...你原来的插件
    // 0.2.0 的默认值：遮住全部文字和所有输入值
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
  ],
})
```

还要看一眼后台。应用表单里的「响应体脱敏」默认是关的，代码里没写 `apiBodyMaskEnabled` 时，SDK 下次启动就用后台的值。

错误上报的默认行为没有变，0.2.0 也是全部上报。想跳过已经处理过的错误，再加 `skipHandledErrors: true`。

## 查看权限与保留期

回放和响应体比普通事件敏感，查看权限和保留期都是单独的：

| 数据 | 查看权限 | 保留期 |
| --- | --- | --- |
| 事件 | 各分析页面自己的权限 | 「数据保留期」，默认 90 天 |
| 会话回放 | `sys:track-replay:view` | 「回放保留期」，默认 14 天 |
| 响应体 | `sys:track-user:view-body` | 「响应体保留期」，默认 7 天 |

保留期在应用表单里按应用设置。查看回放和响应体都会写操作日志，能查到谁看过。

## 合规建议

- 在隐私政策里写明采集范围，并给用户一个拒绝的入口，点了就调用 `optOut()`。
- 有个人信息的区域加 `data-track-mask`，或者写进 `maskSelectors`。
- 开响应体采集前先想清楚有没有必要。响应体可能带个人信息时，打开 `apiBodyMaskEnabled`。
- 错误信息里可能带手机号、订单号或后端的异常文本，需要时用 `beforeSend` 改写。
- 回放和响应体的查看权限只给需要的人，保留期按需要设短。
- 谁能看这些数据、留多久，按公司的制度定。

<div class="ms-cards">

- [插件](/track/plugins) 每个插件采集什么，凭证接口怎么判定。
- [安全清单](/boot/security-checklist) 上线前要逐项核对的安全配置。

</div>
