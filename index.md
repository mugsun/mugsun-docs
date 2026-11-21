---
layout: home
markdownStyles: false
title: 自带埋点、GIS 和 AI 的开源中后台系统
description: mugsun 是一套开源的中后台系统，后端和管理后台配套提供，自带埋点分析、GIS 和 AI 三个可选模块。
landing:
  copyLabel: 复制命令
  hero:
    badge:
      text: MIT 许可，源码在 GitHub
      link: https://github.com/mugsun
    title:
      - 自带埋点、GIS 和 AI 的
      - 开源中后台系统
    lead: 后端和管理后台配套提供，多租户、工作流和代码生成已经做好。埋点分析、GIS 和 AI 是三个可选模块，用不到的可以不带。
    actions:
      - text: 快速开始
        link: /guide/getting-started
        theme: brand
      - text: 它包含什么
        link: /guide/introduction
        theme: alt
    note: 试用只需要 Docker，三条命令就能在本机打开管理后台。
  facts:
    - value: 1 个 JAR
      label: 后端打成一个可执行 JAR，运行时只需要 PostgreSQL 和 Redis
    - value: 3 个可选模块
      label: GIS、埋点和 AI 按需打包，用不到的可以不带
    - value: 119 个组件
      label: uni-app x 组件库 ms-ui，App、小程序和 H5 通用
    - value: MIT
      label: 后端、管理后台和埋点 SDK 的源码都在 GitHub 上
  showcase:
    title: 先看看它长什么样
    lead: 这些都是本地运行时的真实截图，数据是演示数据。
    more: 查看文档
    items:
      - title: 数据概览
        text: 访问趋势、流量来源和热门页面放在同一个页面里。
        src: /readme/track-overview.png
        alt: 埋点分析的数据概览页
        label: 埋点分析 / 数据概览
        link: /track/
      - title: 地图工作台
        text: 在地图上画点、线、面，保存为场景，叠加图层做空间分析。
        src: /screenshots/gis/gis-workspace.png
        alt: GIS 地图工作台
        label: 地理信息 / 地图
        link: /pc/gis
      - title: AI 应用编排
        text: 在画布上把大模型和知识库连成一个 AI 应用。
        src: /screenshots/pc/ai-app-orchestration.png
        alt: 应用编排的画布和右侧的节点属性
        label: AI 中心 / 应用编排
        link: /pc/designer#ai-应用编排
      - title: 会话回放
        text: 按会话回看用户的操作过程，密码框始终不录。
        src: /readme/track-replay.png
        alt: 会话回放播放器
        label: 埋点分析 / 会话回放
        link: /track/plugins
      - title: 菜单与权限
        text: 菜单和按钮权限在这里维护，前端按后端返回的结果渲染。
        src: /readme/system-menu.png
        alt: 系统管理的菜单管理页
        label: 系统管理 / 菜单管理
        link: /boot/permissions
      - title: 代码生成
        text: 生成前先预览每个文件，确认后再下载。
        src: /screenshots/codegen/gen-preview.png
        alt: 代码生成的预览窗口
        label: 系统管理 / 代码生成
        link: /boot/codegen/
      - title: 移动端组件
        text: ms-ui 的组件演示，在文档页里可以直接操作。
        src: /readme/uniappx-demo.png
        alt: ms-ui 组件演示
        label: ms-ui 演示
        link: /uniappx/
        fit: contain
  paths:
    eyebrow: 文档
    title: 按你要做的事开始读
    lead: 不用从头读到尾。选一条路线，按顺序读三篇。
    items:
      - icon: compass
        title: 第一次了解 mugsun
        text: 先弄清它包含什么，再在本机跑起来。
        links:
          - text: 介绍
            link: /guide/introduction
          - text: 快速开始
            link: /guide/getting-started
          - text: 架构
            link: /guide/architecture
      - icon: server
        title: 开发后端接口
        text: 从一个接口写到一整套增删改查。
        links:
          - text: 第一个接口
            link: /boot/tutorial/first-api
          - text: 第一个 CRUD
            link: /boot/tutorial/first-crud
          - text: 代码生成
            link: /boot/codegen/
      - icon: layout
        title: 开发管理后台页面
        text: 启动前端，按约定写页面和表单。
        links:
          - text: 本地开发
            link: /pc/development
          - text: UI 自检
            link: /pc/ui-check
          - text: 表单校验
            link: /pc/form-validation
      - icon: activity
        title: 给自己的产品接入埋点
        text: 装上 SDK，发出第一个事件。
        links:
          - text: 安装与初始化
            link: /track/install
          - text: 第一个事件
            link: /track/first-event
          - text: 隐私与合规
            link: /track/privacy
      - icon: deploy
        title: 部署到服务器
        text: 上线前要改的配置和要查的清单。
        links:
          - text: Docker 部署
            link: /pc/deploy-docker
          - text: 配置参考
            link: /boot/configuration
          - text: 安全清单
            link: /boot/security-checklist
      - icon: help
        title: 遇到问题
        text: 先按报错信息查，再看常见问题。
        links:
          - text: 报错速查
            link: /guide/errors
          - text: 常见问题
            link: /guide/faq
          - text: 升级指南
            link: /guide/upgrade/
  features:
    eyebrow: 功能
    title: 中后台常用的功能，已经做好了
    lead: 这些功能都在同一套代码里，登录管理后台就能用。每一项都有单独的文档。
    items:
      - icon: users
        title: 用户与权限
        text: 用户、角色和菜单都在后台维护，按钮权限和数据范围由后端统一判断。
        link: /boot/permissions
      - icon: tenant
        title: 多租户
        text: 一个库、一套表服务多个租户，查询和修改时自动带上当前租户的条件。
        link: /boot/tenant/
      - icon: flow
        title: 工作流
        text: 在线画流程，支持条件、并行和会签；审批节点可以先交给 AI 预审。
        link: /boot/features/workflow
      - icon: code
        title: 代码生成
        text: 从表结构生成前后端代码，生成前可以逐个文件预览。
        link: /boot/codegen/
      - icon: chart
        title: 埋点分析
        text: 接入 SDK 后，在管理后台里查看事件、漏斗和留存，还能回放用户的会话。
        link: /track/
      - icon: map
        title: GIS 与地图
        text: 图层、底图和空间分析基于 PostGIS，地图工作台可以在二维和三维之间切换。
        link: /pc/gis
      - icon: spark
        title: AI 中心
        text: 在后台管理模型、对话和知识库，知识库可以上传 PDF、Word 和 PPT。
        link: /pc/ai-center
      - icon: shield
        title: 国密与国产数据库
        text: 传输用 SM2 加密，字段用 SM4 加密；可以换成人大金仓或达梦数据库。
        link: /boot/configuration
      - icon: plug
        title: 开放平台
        text: 用 API Key 或 OAuth2 把接口开放给第三方系统，带签名校验、限流和 IP 白名单。
        link: /boot/open-api
  start:
    eyebrow: 快速开始
    title: 三条命令，在本机跑起来
    lead: 只需要安装 Docker。整套系统都在容器里启动，包括数据库和 Redis。
    steps:
      - title: 克隆并启动
        text: 第一次启动要构建镜像，花的时间取决于网络。
      - title: 查看管理员口令
        text: 第三条命令会打印 admin 的口令。
      - title: 登录
        text: 打开 http://127.0.0.1:8088，用 admin 登录。第一次登录要先修改口令。
    action:
      text: 查看完整步骤
      link: /guide/getting-started
    lines:
      - comment: 克隆后端仓库
        cmd: git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
      - comment: 构建镜像并启动整套系统
        cmd: docker compose -f docker-compose.full.yml up -d --build
      - comment: 查看管理员口令
        cmd: docker compose -f docker-compose.full.yml run --rm init show
  products:
    eyebrow: 仓库
    title: 整套使用，或者只用其中一部分
    lead: mugsun 由几个独立的仓库组成，每个仓库在这里都有自己的文档。
    docs: 阅读文档
    items:
      - name: mugsun-boot
        role: 后端
        text: 账号权限、租户和工作流都在这个 JAR 里，GIS、埋点和 AI 是可选模块。
        tags: [JDK 21, Spring Boot 3, MyBatis-Flex, Sa-Token]
        link: /boot/
        repo: https://github.com/mugsun/mugsun-boot
      - name: mugsun-pc
        role: 管理后台
        text: 自带系统管理、工作流和租户运营的页面，菜单和按钮权限由后端返回。
        tags: [Vue 3, Vite 7, Element Plus, Pinia]
        link: /pc/
        repo: https://github.com/mugsun/mugsun-pc
      - name: "@mugsun/track-web"
        role: 埋点 SDK
        text: 在浏览器里采集页面浏览、点击和错误，上报到 mugsun-boot 后端。
        tags: [TypeScript, npm, rrweb]
        link: /track/
        repo: https://github.com/mugsun/mugsun-track
      - name: ms-ui
        role: 移动端组件库
        text: 面向 uni-app x 的组件库，每个组件页列出属性、事件和插槽，带演示的可以直接操作。
        tags: [uni-app x, uvue, uts]
        link: /uniappx/
        note: 源码仓库暂未公开
      - name: mugsun-core
        role: 公共库
        text: 统一响应体、全局异常处理和接口加解密，后端依赖它，也可以单独引入。
        tags: [BOM, Spring Boot Starter]
        link: /core/
        repo: https://github.com/mugsun/mugsun-core
      - name: mugsun-start
        role: 项目生成器
        text: 选择工程类型和可选模块后生成工程压缩包，目前还没有接入 mugsun 模板。
        tags: [Spring Initializr, 开发中]
        link: /start/
        repo: https://github.com/mugsun/mugsun-start
  cta:
    title: 先在本机跑起来看看
    text: 试用只需要 Docker。想改代码时，再分别启动后端和管理后台。
    actions:
      - text: 快速开始
        link: /guide/getting-started
        theme: brand
      - text: 在 GitHub 上查看
        link: https://github.com/mugsun
        theme: alt
---

<HomeLanding />
