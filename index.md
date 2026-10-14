---
layout: home
title: 部署在自己服务器上的中后台
hero:
  name: mugsun
  text: 部署在自己服务器上的中后台
  tagline: Spring Boot 后端、Vue 3 管理台、浏览器埋点 SDK，数据全在你自己的库里。
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 介绍
      link: /guide/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: 后台现成
    details: 用户、角色、菜单、部门、多租户、审批流都已写好，权限由后端统一下发。
    link: /pc/
    linkText: 管理台
  - title: 自带埋点分析
    details: 前端装一个 SDK，后台就能看访问量、漏斗、留存和会话回放。
    link: /track/
    linkText: 埋点
  - title: 模块可关
    details: GIS、埋点、AI 是独立模块，不用的可以不打进包。
    link: /boot/
    linkText: 后端
  - title: 跨端组件
    details: uni-app x 组件文档，每个组件都能直接看 H5 演示。
    link: /uniappx/
    linkText: 组件
---

## 用 Docker 试一下

机器上只要有 Docker。数据库、Redis、后端和管理台都在容器里启动。

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
```

打开 <http://localhost:8088> 登录。管理员密码怎么查、怎么本地开发，见 [快速开始](/guide/getting-started)。
