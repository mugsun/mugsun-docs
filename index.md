---
layout: home
hero:
  name: mugsun
  text: 可私有化的中后台底座
  tagline: 多租户与国密、嵌入式埋点全链路；GIS / AI 按需启用。不是大而全低代码——把「采集 → 服务端 → 看板」打通，并让你带得走。
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 接入埋点
      link: /track/install
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: 跑起来
    details: 平级安装 core，compose 起库，Maven 启动 boot；可选打开 pc 管理台。
    link: /guide/getting-started
    linkText: 快速开始
  - title: 接埋点
    details: 安装 @mugsun/track-web，配置采集地址，在看板核对首条事件。
    link: /track/first-event
    linkText: 第一个事件
  - title: 二次开发
    details: 看清 boot / pc / track / core 分工，按需开关 GIS / Track / AI。
    link: /guide/architecture
    linkText: 架构全景
---

## 模块一览

| 模块 | 说明 | 状态 |
| --- | --- | --- |
| [boot](/boot/) | Spring Boot 3.5 模块化后端 | 免费开源 |
| [pc](/pc/) | Vue3 + Element Plus 管理台 | 免费开源 |
| [track](/track/) | 轻量 Web 埋点 SDK + 服务端 + 看板 | 免费开源（招牌） |
| [core](/core/) | BOM 与 starter | 免费开源 |
| cloud | 微服务版 | <span class="soon">规划中</span> |
| [ms-ui](/uniappx/) | uni-app x 跨端组件库（非 PC 管理台） | 文档已开放 |

## 演示

当前**没有**公网可点演示。请按 [快速开始](/guide/getting-started) 本地拉起；演示账号与口令以 boot README 为准，**首次登录请改密**。说明见 [演示](/demo)。
