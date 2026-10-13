---
layout: home
title: 可私有化的中后台底座
hero:
  name: mugsun
  text: 可私有化的中后台底座
  tagline: 后端、管理台、埋点 SDK 一套带走。多租户、国密与审计默认在位；GIS / AI 按需装配。
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 架构全景
      link: /guide/architecture
    - theme: alt
      text: 组件在线演示
      link: /demo
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: 模块化单体后端
    details: JDK 21 + Spring Boot 3.5.13。core / gis / track / ai 以 Maven Profile 装配，运行时可用环境变量逐项关闭。
    link: /boot/
    linkText: Boot 概述
  - title: 安全默认值
    details: 多租户隔离、Sa-Token 权限码、接口国密加解密、登录与操作审计；prod 缺初始口令即拒绝启动。
    link: /boot/security-checklist
    linkText: 上线安全清单
  - title: 嵌入式埋点竖切
    details: "@mugsun/track-web SDK → /track/collect 摄入 → 管理台看板，数据留在你自己的库里。"
    link: /track/
    linkText: 埋点概述
  - title: 权限驱动的管理台
    details: Vue 3.5 + Vite 7 + Element Plus 2.11（按需加载）。菜单与按钮码由后端下发，可选模块由构建期开关控制。
    link: /pc/
    linkText: 管理台概述
  - title: 已发布至 Maven Central
    details: mugsun-core 0.1.0 提供 BOM 与 Web / MyBatis Starter，业务工程直接引坐标，无需本地 install。
    link: /core/
    linkText: Core 概述
  - title: ms-ui · uni-app x 组件
    details: 119 个 ms- 前缀组件，文档页内嵌 H5 手机框实时预览，示例代码与演示源码同步。
    link: /uniappx/
    linkText: 浏览组件
---

<div class="home-body">

## 从克隆到后端启动

依赖 JDK 21、Maven 3.9+ 与 Docker。`docker compose` 只起 PostgreSQL 与 Redis，应用由 Maven 启动。

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am spring-boot:run   # http://localhost:8080/ping
```

完整步骤（含管理台与第一个埋点事件）见 [快速开始](/guide/getting-started)。

## 在业务页面接入埋点

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://your-host',   // 实际上报 {endpoint}/track/collect
  appKey: 'your-app-key',          // 管理台「埋点分析 → 接入管理」创建
})

track.track('button_click', { name: 'buy' })
```

默认插件覆盖页面浏览、停留、全埋点、曝光、Web Vitals 与错误；回放、接口监控、圈选、地理位置按需注册。详见 [安装与初始化](/track/install)。

## 模块一览

| 模块 | 技术栈 | 许可 | 状态 |
| --- | --- | --- | --- |
| [boot](/boot/) 后端 | JDK 21 · Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · Flyway | Apache-2.0 | 0.1.0 开源 |
| [core](/core/) 共享内核 | BOM · Web / MyBatis Starter | Apache-2.0 | 0.1.0 · Maven Central |
| [pc](/pc/) 管理台 | Vue 3.5 · Vite 7 · Element Plus 2.11 · Pinia | MIT | 0.1.0 开源 |
| [track](/track/) 埋点 SDK | TypeScript · 插件化内核 · rrweb 回放（独立入口） | MIT | 0.2.0（npm 当前 0.1.0） |
| [ms-ui](/uniappx/) 跨端组件 | uni-app x（uvue / uts） | — | 文档与 H5 演示开放 |
| cloud 微服务版 | — | — | <span class="soon">规划中</span> |

## 适合与不适合

| 适合 | 不适合 |
| --- | --- |
| 需要私有化交付、数据不出域的中后台项目 | 想要拖拽即成、不写代码的低代码平台 |
| 既要后台管理又要产品行为分析，不想再接一套公有云 SaaS | 只需要一个纯前端模板、不需要后端 |
| 信创数据库（Kingbase / 达梦 Profile）或国密传输有要求 | 现在就要微服务拆分（cloud 仍在规划） |

## 演示与资源

- **ms-ui 组件**：桌面端文档页右下角手机框直接预览 H5，移动端点底栏入口；也可 [打开完整 H5 演示](/demo/index.html)。
- **管理台与埋点全链路**：暂无公网演示环境，按 [快速开始](/guide/getting-started) 可在本地完整拉起。
- [更新日志](/guide/changelog) · [常见问题](/guide/faq) · [贡献指南](https://github.com/mugsun/.github)

</div>
