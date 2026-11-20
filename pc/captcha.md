# 行为验证码

登录、注册、忘记密码和发短信验证码之前，管理后台会弹出一道行为验证码，做对了才提交。

这一页讲用户看到什么、每种题怎么做，以及出错时页面怎么反应。后端的规则见[后端的行为验证码](/boot/captcha)。

![登录页点「登录」后弹出的「安全验证」弹窗，题目是滑块拼图](/screenshots/pc/captcha-dialog.png)

## 什么时候弹出

| 页面 | 点哪个按钮时弹出 |
| --- | --- |
| 登录页的「账号登录」 | 「登录」 |
| 登录页的「短信登录」 | 「发送验证码」 |
| 注册页 | 「注册」 |
| 忘记密码页 | 「发送验证码」 |

- 页面打开时先问后端这个场景要不要验证。不需要时点按钮直接提交，不弹窗。
- 出哪种题由后端随机决定，页面不能指定。
- 做对后弹窗自己关闭，接着提交刚才的操作。
- 中途关掉弹窗，这次操作就不提交。

## 五种题怎么做

| 题型 | 怎么做 | 什么时候提交 |
| --- | --- | --- |
| 滑块拼图 | 向右拖动滑块，把拼图块移到缺口上 | 松手 |
| 旋转 | 拖动滑块，把中间的圆图转正 | 松手 |
| 文字点选 | 按提示里的字序，依次点图里的字 | 点够数量 |
| 图标点选 | 按提示里的顺序，依次点图里的图标 | 点够数量 |
| 拼图还原 | 点两块交换位置，直到图片复原 | 点「完成」 |

- 旋转题的滑块拖到最右等于转一整圈。
- 旋转题拖得很慢时进入精调，图片转动的幅度降到 0.6 倍，方便对准。
- 点选题点过的位置标着序号。点某个序号，它和它后面的点一起撤销。
- 点选题的「撤销」按钮撤销最后一个点。
- 拼图题也可以把一块拖到另一块上来交换。至少交换过一次，「完成」才能点。
- 点右下角的「换一张」换一道题，换出来的题型可能不同。

## 只用键盘 {#keyboard}

点左下角的「改用键盘」，页面换一道能用键盘做的题。键盘模式只出滑块拼图和旋转两种。

| 按键 | 作用 |
| --- | --- |
| `←` `→` | 移动拼图块或转动图片，按一次走一步 |
| `Shift` 加 `←` `→` | 按一次走 10 步 |
| `Enter` | 提交 |

- 一步有多大由后端随题目返回。默认滑块拼图是原图上的 4 像素，旋转是 5°。
- 做滑块拼图或旋转题时在鼠标模式下按方向键，页面会切到键盘模式并换一道题。
- 键盘模式下用鼠标拖滑块，或者点「改用鼠标 / 触屏」，页面切回鼠标模式并换一道题。
- 租户没有启用滑块拼图和旋转时，键盘模式没有题可出，弹窗提示改用鼠标或触屏。

## 出错时页面怎么反应 {#errors}

| 情况 | 错误码 | 页面的反应 |
| --- | --- | --- |
| 没做对 | `40011` | 提示「请再试一次」，弹窗抖一下，然后自动换一道题 |
| 题目过期 | `40010` | 自动换一道题，不算失败 |
| 失败次数太多 | `40012` | 显示倒计时，期间不能操作，结束后自动换一道题 |
| 这次不需要验证 | `40014` | 关闭弹窗，直接提交 |
| 没有键盘能做的题 | `40015` | 提示改用鼠标或触屏，不自动重试 |
| 题型暂时不可用 | `40016` | 提示联系管理员，不自动重试 |
| 提交后后端仍要求验证 | `40013` | 重新弹出验证码，只自动弹一次 |
| 网络不通或其他错误 | 无 | 提示「加载失败，请检查网络」，给出「重试」按钮 |

- 题目默认 120 秒过期。到时间后页面自己换题。
- 倒计时的秒数取后端返回的 `retryAfter`，没有返回时按 60 秒。
- 校验请求中途断开，按没做对处理。
- 后端返回页面不认识的题型时，弹窗显示「验证方式暂不可用，请联系管理员」。

各个错误码在后端的含义见[错误码](/boot/captcha#错误码)。

### 验证码加载失败 {#config-error}

页面打开时问不到要不要验证，表单里会出现一块提示，带「重试」按钮和一个错误编号。

- 错误编号是这次请求的 `X-Trace-Id`，拿它能在后端日志里找到这次请求。
- 这时「登录」「注册」和「发送验证码」按钮不能点，页面不会跳过验证码去提交。
- 后端返回的设置里有页面不认识的类型时，也按加载失败处理。
- 提示直接显示在表单里，不弹消息框。读屏软件会朗读一次。

## 给租户单独设置 {#tenant}

平台超管可以给每个租户单独开关验证码，或者只留下其中几种题型。

打开「租户运营 → 租户管理」，点某一行的「验证码」，在弹出的「验证码设置」里改。

| 项 | 说明 |
| --- | --- |
| 启用验证 | 关掉后，这个租户不再要求验证码 |
| 启用题型 | 勾选这个租户会出的题型。一个都不勾，就用平台默认的题型 |

- 有些组合能保存，但后端会给出提醒，例如只勾了「旋转（辅助）」。
- 有提醒时弹窗不关，提醒显示在「已保存，但请注意」下面。
- 发短信验证码不看租户的设置，只看全局开关。
- 界面语言不影响出哪种题。英文界面也会出文字点选题，提示里的词是中文。
- 弹窗里有一句「英文界面不出文字点选」，它和后端现在的做法不一致，以上一条为准。

全局开关和各项参数见[后端的配置](/boot/captcha#配置)。关闭之前先看[租户开关](/boot/captcha#tenant-switch)里的提醒。

## 改这部分代码 {#code}

| 文件 | 作用 |
| --- | --- |
| `src/hooks/core/useCaptchaGate.ts` | 决定要不要弹验证码，并包住要提交的请求 |
| `src/components/core/captcha/CaptchaDialog.vue` | 弹窗，负责取题、校验、换题和各种提示 |
| `src/components/core/captcha/*Panel.vue` | 四个做题面板，分别是滑块、旋转、点选和拼图 |
| `src/components/core/captcha/CaptchaConfigError.vue` | 表单里那块加载失败的提示 |
| `src/utils/captcha/` | 坐标换算、键盘步长和错误码分类 |
| `src/api/captcha.ts` | 三个接口的请求 |

- 题图的显示宽度在 260 到 320 像素之间。屏幕更窄时弹窗整体缩小，上报的宽度仍是 260。
- 坐标按显示像素上报，原点在题图左上角，后端再换算回原图像素。
- 校验通过后拿到一次性的 `captchaToken`，由 `useCaptchaGate` 放进接下来的请求。

### 接到自己的表单里 {#usage}

登录页是下面这样接的。用在别的表单时，换掉场景名和 `fetchLogin`。

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
  <ElButton :disabled="!gate.ready.value" @click="submit">登录</ElButton>
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

- 场景只有四个，分别是 `login`、`register`、`sms` 和 `forget`。
- 用户关掉弹窗时，`run` 抛出的错误用 `isCaptchaCancelled` 能认出来，直接返回就行。
- 验证码还没准备好就提交时，`run` 抛出的错误用 `isCaptchaNotReady` 能认出来。

## 不连后端调试界面 {#mock}

只想看验证码的界面时，可以让页面自己出题和判题，不用启动后端。

```bash
VITE_CAPTCHA_MOCK=true pnpm dev
```

这个变量只写在命令行里，不要写进 `.env` 文件。它只在开发服务器里起作用，打包结果里没有这段代码。

| 想看什么 | 在浏览器里怎么设 |
| --- | --- |
| 指定题型 | 地址后面加 `?captchaType=ROTATE` |
| 没有键盘能做的题 | `sessionStorage.captchaMockNoKeyboard = '1'` |
| 验证码加载失败 | `sessionStorage.captchaMockConfig = 'error'` |
| 页面不认识的类型 | `sessionStorage.captchaMockConfig = 'unknown'` |
| 文字点选用哪个词 | `sessionStorage.captchaMockWord = '一帆风顺'` |
| 旋转题的容差 | `sessionStorage.captchaMockRotateTol = '7'`，默认是 10 |

- 模拟的规则是一道题只能校验一次，120 秒过期，连错 5 次锁 10 秒。
- 模拟的容差是滑块拼图 ±8 像素，旋转 ±10°。
- 模拟只用来看界面。题目做得对不对，以后端的校验为准。

## 下一步

<div class="ms-cards">

- [后端的行为验证码](/boot/captcha) 题型、接口、配置，以及上线前要换掉的素材。
- [租户与套餐](/boot/tenant/manage) 新建租户，设置账号上限和过期时间。
- [本地开发](/pc/development#e2e) 验证码开着和关着各跑一套端到端测试。
- [安全清单](/boot/security-checklist) 上线前逐项核对。

</div>
