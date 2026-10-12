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
      text: 开始使用
      link: /guide/getting-started
    - theme: alt
      text: 接入埋点
      link: /track/install
    - theme: alt
      text: 本地演示说明
      link: /demo
features:
  - title: 我要跑起来
    details: 一条 docker compose，从空库到登录；系统管理可点。
    link: /guide/getting-started
    linkText: 快速开始
  - title: 我要接埋点
    details: 安装 @mugsun/track-web，争取 30 分钟内在看板看到事件。
    link: /track/first-event
    linkText: 第一个事件
  - title: 我要二次开发
    details: 看清 boot / pc / track / core 分工，打开模块开关，本地联调。
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
| uniappx-ui | uni-app x 组件库 | <span class="soon">规划中</span> |

## 在线演示

公网演示即将上线。当前请按 [快速开始](/guide/getting-started) 本地拉起；演示账号与口令写在该页，**首次登录请改密**。
