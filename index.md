---
layout: home
markdownStyles: false
pageClass: ms-landing
title: 自带埋点、GIS 和 AI 的开源中后台系统
description: mugsun 是一套开源的中后台系统，后端和管理后台配套提供，自带埋点分析、GIS 和 AI 三个可选模块。
landing:
  ui:
    copy: 复制
    copied: 已复制
    copyFailed: 没复制成
    replay: 重播
    demo: 演示数据
    facts: 几个数字
  hero:
    badge:
      text: MIT 许可，源码在 GitHub
      link: https://github.com/mugsun
    # {track}、{gis} 和 {ai} 是标题里可以点的三个词，字写在 words 里
    title:
      - 自带{track}、{gis} 和 {ai} 的
      - 开源中后台系统
    words:
      track: 埋点
      gis: GIS
      ai: AI
    lead: 后端和管理后台配套提供，多租户、工作流和代码生成已经做好。埋点分析、GIS 和 AI 是三个可选模块，用不到的可以不带。
    actions:
      - text: 快速开始
        link: /guide/getting-started
        theme: brand
      - text: 它包含什么
        link: /guide/introduction
        theme: alt
    note: 试用只需要 Docker，三条命令就能在本机打开管理后台。
    # 首屏右侧的地球和它下面的面板。数字取自本地演示环境。
    globe:
      hint: 拖动可以转动地球
      tabs: 可选模块
      track:
        tab: 埋点分析
        kpis:
          - id: pv
            value: "2,123"
            label: 浏览量
          - id: uv
            value: "660"
            label: 访客
          - id: ss
            value: "1,178"
            label: 会话
          - id: ev
            value: "5,753"
            label: 事件
        stream: 实时事件流
        hint: 点一下地球，发一条事件
      gis:
        tab: GIS 与地图
        layers: 图层
        items:
          - name: 底图
            note: 海陆轮廓
          - name: 经纬网
            note: 每 15°
          - name: 业务图层
            note: 画出来的面
        draw: 绘制
        drawText: 点、线、面
        again: 重画一遍
        areaLabel: 面积
        # {wan} 是按万平方公里算的数，{million} 是按百万平方公里算的数
        area: 约 {wan} 万 km²
        view: 视图
        viewText: 二维和三维可以切换
        store: 存储
        storeText: PostGIS · WGS84
        vertex: 顶点 {n}
        shape: 面 · 6 个顶点
      ai:
        tab: AI 中心
        app: 应用编排 · 合同摘要
        steps:
          - kind: START
            name: 开始
          - kind: 知识库
            name: 检索条款
          - kind: 大模型
            name: 生成摘要
          - kind: END
            name: 结束
        idle: 待运行
        running: 运行中
        step: 运行中：{name}
        done: 已完成
        ask: 埋点分析 · 问数据
        askHint: 点一个问题试试
        askIntro: 问一句中文查埋点数据。模型只判断你想看哪一类，数字来自分析接口。
        thinking: 正在判断你想看哪类数据…
        # 答案里花括号括起来的字会加粗
        questions:
          - intent: overview
            q: 最近 7 天概览
            a: 近 7 天：浏览量 {2,123}，访客 {660}，会话 {1,178}，跳出率 {44.3%}
          - intent: online
            q: 今日在线人数
            a: 近 5 分钟活跃会话 {21} 个
          - intent: pages
            q: 热门页面
            a: "{/} 1,178 次，{/item} 678 次，{/cart} 251 次"
  facts:
    - value: 1 个 JAR
      label: 后端打成一个可执行 JAR，运行时只需要 PostgreSQL 和 Redis
    - value: 3 个可选模块
      label: GIS、埋点和 AI 按需打包，用不到的可以不带
    - value: 119 个组件
      label: uni-app x 组件库 ms-ui，App、小程序和 H5 通用
    - value: MIT
      unit: 许可
      label: 后端、管理后台和埋点 SDK 的源码都在 GitHub 上
  showcase:
    title: 先看看它长什么样
    lead: 这些都是本地运行时的真实截图，数据是演示数据。
    more: 查看文档
    list: 截图
    theme:
      label: 截图的主题
      dark: 深色
      light: 浅色
    items:
      - title: 数据概览
        text: 访问趋势、流量来源和热门页面放在同一个页面里。
        src: /readme/track-overview.png
        dark: /screenshots/track/track-overview-dark.png
        alt: 埋点分析的数据概览页
        label: 埋点分析 / 数据概览
        link: /track/
      - title: 地图工作台
        text: 在地图上画点、线、面，保存为场景，叠加图层做空间分析。
        src: /screenshots/gis/gis-workspace.png
        dark: /screenshots/gis/gis-workspace-dark.png
        alt: GIS 地图工作台
        label: 地理信息 / 地图
        link: /pc/gis
      - title: AI 应用编排
        text: 在画布上把大模型和知识库连成一个 AI 应用。
        src: /screenshots/pc/ai-app-orchestration.png
        dark: /screenshots/pc/ai-app-orchestration-dark.png
        alt: 应用编排的画布和右侧的节点属性
        label: AI 中心 / 应用编排
        link: /pc/designer#ai-应用编排
      - title: 会话回放
        text: 按会话回看用户的操作过程，密码框始终不录。
        src: /readme/track-replay.png
        dark: /screenshots/track/track-replay-dark.png
        alt: 会话回放播放器
        label: 埋点分析 / 会话回放
        link: /track/plugins
      - title: 菜单与权限
        text: 菜单和按钮权限在这里维护，前端按后端返回的结果渲染。
        src: /readme/system-menu.png
        dark: /screenshots/pc/system-menu-dark.png
        alt: 系统管理的菜单管理页
        label: 系统管理 / 菜单管理
        link: /boot/permissions
      - title: 代码生成
        text: 生成前先预览每个文件，确认后再下载。
        src: /screenshots/codegen/gen-preview.png
        dark: /screenshots/codegen/gen-preview-dark.png
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
  # 三个可选模块的开关。打包命令由页面按开关拼出来，这里只写说明文字。
  modules:
    title:
      - 三个可选模块，
      - 用不到的可以不带
    lead: 打包时决定哪些模块进 JAR，启动时还可以把已经打进去的模块关掉。点下面的开关，看右边怎么变。
    fixed: 必带
    core:
      name: 核心
      code: mugsun-boot-core
      text: 账号权限、租户和工作流等核心功能
    # short 是写进命令注释里的叫法
    items:
      - key: track
        name: 埋点分析
        short: 埋点分析
        code: mugsun-boot-track
        text: 埋点数据的接收、聚合和回放
      - key: gis
        name: GIS 与地图
        short: GIS
        code: mugsun-boot-gis
        text: 图层、空间查询和矢量瓦片
      - key: ai
        name: AI 中心
        short: AI
        code: mugsun-boot-ai
        text: 模型、对话和知识库
    jar: 打出来的 JAR
    menu: 管理后台的菜单
    menuHint: 关掉的模块，菜单里不再显示
    menuItems:
      - text: 工作台
      - text: 埋点分析
        mod: track
      - text: 地理信息
        mod: gis
      - text: 系统管理
        current: true
      - text: 租户运营
      - text: 开放平台
      - text: AI 中心
        mod: ai
    cmd: 打包命令
    cmdRun: 打包命令和启动变量
    notes:
      all: core 加三个可选模块
      none: 只有 core
      one: core 加 {key}
      two: 三个模块都在 JAR 里，启动时关掉 {key}
    comments:
      all: 三个模块都带。默认的 Profile 就是 full，不用写
      none: 只要核心功能
      one: 核心加{name}
      two: 只带两个模块时，先打完整的包
      off: 启动时把{name}关掉
  # 六项内置功能。kind 决定卡片上画哪一张小图，demo 是图里的字。
  # 埋点、GIS 和 AI 在首屏和「可选模块」里已经讲过，这里不再列。
  features:
    title:
      - 中后台常用的功能，
      - 已经做好了
    lead: 这些功能都在同一套代码里，登录管理后台就能用。每一项都有单独的文档。
    items:
      - kind: perm
        title: 用户与权限
        text: 用户、角色和菜单都在后台维护，按钮权限和数据范围由后端统一判断。
        link: /boot/permissions
        demo:
          roles: [部门主管, 普通员工]
          scope: 数据范围
          scopes: [本部门及子部门, 仅本人数据]
      - kind: tenant
        title: 多租户
        text: 一个库、一套表服务多个租户，查询和修改时自动带上当前租户的条件。
        link: /boot/tenant/
        demo:
          auto: 自动加上
      - kind: flow
        title: 工作流
        text: 在线画流程，支持条件、并行和会签；审批节点可以先交给 AI 预审。
        link: /boot/features/workflow
        demo:
          nodes: [发起, AI 预审, 条件, 审批, 结束]
          parallel: 并行
      - kind: gen
        title: 代码生成
        text: 从表结构生成前后端代码，生成前可以逐个文件预览。
        link: /boot/codegen/
      - kind: gm
        title: 国密与国产数据库
        text: 传输用 SM2 加密，字段用 SM4 加密；可以换成人大金仓或达梦数据库。
        link: /boot/configuration
        demo:
          rows:
            - algo: SM2
              use: 传输
            - algo: SM3
              use: 摘要
            - algo: SM4
              use: 字段
          db: [PostgreSQL, 人大金仓, 达梦]
      - kind: open
        title: 开放平台
        text: 用 API Key 或 OAuth2 把接口开放给第三方系统，带签名校验、限流和 IP 白名单。
        link: /boot/open-api
        demo:
          again: 原样再发一次
          replay: 重放请求
  # 技术栈只写在这里的 tags 里
  products:
    title:
      - 整套使用，
      - 或者只用其中一部分
    lead: mugsun 由几个独立的仓库组成，每个仓库在这里都有自己的文档。
    docs: 阅读文档
    items:
      - name: mugsun-boot
        role: 后端
        text: 账号权限、租户和工作流都在这个 JAR 里，GIS、埋点和 AI 是可选模块。
        tags: [JDK 21, Spring Boot 4, MyBatis-Flex, Sa-Token]
        link: /boot/
        repo: https://github.com/mugsun/mugsun-boot
      - name: mugsun-cloud
        role: 后端微服务版
        text: 和 mugsun-boot 用同一份业务代码，拆成一个网关和几个服务，接口路径不变。
        tags: [JDK 21, Spring Cloud Gateway, Nacos]
        link: /cloud/
        repo: https://github.com/mugsun/mugsun-cloud
      - name: mugsun-pc
        role: 管理后台
        text: 自带系统管理、工作流和租户运营的页面，菜单和按钮权限由后端返回。
        tags: [Vue 3, Vite 7, Element Plus, Pinia]
        link: /pc/
        repo: https://github.com/mugsun/mugsun-pc
      - name: "@mugsun/track-web"
        role: 埋点 SDK
        text: 在浏览器里采集页面浏览、点击和错误，上报到 mugsun 的后端。
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
  start:
    title:
      - 三条命令，
      - 在本机跑起来
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
    # step 是这条命令对应上面第几步，从 0 数
    lines:
      - comment: 克隆后端仓库
        cmd: git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
        step: 0
      - comment: 构建镜像并启动整套系统
        cmd: docker compose -f docker-compose.full.yml up -d --build
        step: 0
      - comment: 查看管理员口令
        cmd: docker compose -f docker-compose.full.yml run --rm init show
        step: 1
    open: 打开 http://127.0.0.1:8088，用 admin 登录
  # 六条阅读路线，每条三篇，按顺序读
  paths:
    label: 阅读路线
    title:
      - 按你要做的事
      - 开始读
    lead: 不用从头读到尾。选一条路线，按顺序读三篇。
    items:
      - title: 第一次了解 mugsun
        text: 先弄清它包含什么，再在本机跑起来。
        links:
          - text: 介绍
            link: /guide/introduction
          - text: 快速开始
            link: /guide/getting-started
          - text: 架构
            link: /guide/architecture
      - title: 开发后端接口
        text: 从一个接口写到一整套增删改查。
        links:
          - text: 第一个接口
            link: /boot/tutorial/first-api
          - text: 第一个 CRUD
            link: /boot/tutorial/first-crud
          - text: 代码生成
            link: /boot/codegen/
      - title: 开发管理后台页面
        text: 启动前端，按约定写页面和表单。
        links:
          - text: 本地开发
            link: /pc/development
          - text: UI 自检
            link: /pc/ui-check
          - text: 表单校验
            link: /pc/form-validation
      - title: 给自己的产品接入埋点
        text: 装上 SDK，发出第一个事件。
        links:
          - text: 安装与初始化
            link: /track/install
          - text: 第一个事件
            link: /track/first-event
          - text: 隐私与合规
            link: /track/privacy
      - title: 部署到服务器
        text: 上线前要改的配置和要查的清单。
        links:
          - text: Docker 部署
            link: /pc/deploy-docker
          - text: 配置参考
            link: /boot/configuration
          - text: 安全清单
            link: /boot/security-checklist
      - title: 遇到问题
        text: 先按报错信息查，再看常见问题。
        links:
          - text: 报错速查
            link: /guide/errors
          - text: 常见问题
            link: /guide/faq
          - text: 升级指南
            link: /guide/upgrade/
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
  footer:
    tagline: 自带埋点、GIS 和 AI 的开源中后台系统
    columns:
      - title: 仓库
        links:
          - text: mugsun-boot
            note: 后端
            link: /boot/
          - text: mugsun-cloud
            note: 后端微服务版
            link: /cloud/
          - text: mugsun-pc
            note: 管理后台
            link: /pc/
          - text: "@mugsun/track-web"
            note: 埋点 SDK
            link: /track/
          - text: ms-ui
            note: 移动端组件库
            link: /uniappx/
          - text: mugsun-core
            note: 公共库
            link: /core/
      - title: 文档
        links:
          - text: 介绍
            link: /guide/introduction
          - text: 快速开始
            link: /guide/getting-started
          - text: 架构
            link: /guide/architecture
          - text: 常见问题
            link: /guide/faq
          - text: 更新日志
            link: /guide/changelog
      - title: 其他
        links:
          - text: GitHub
            link: https://github.com/mugsun
          - text: English
            link: /en/
---

<HomeLanding />
