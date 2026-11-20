# 在线演示

移动端组件库 ms-ui 有可以直接打开的在线演示。管理后台和埋点看板还没有公网演示站，要在本机用 Docker 启动。

<div class="ms-cards">

- [在本机运行](#local) 三条命令启动后端和管理后台，数据库和 Redis 也在容器里。
- [移动端组件演示](#ms-ui) 在浏览器里直接操作 ms-ui 的组件，不用安装任何东西。
- [部署只读演示站](#readonly) 把自己的一套环境公开给访客，访客改不了数据。

</div>

## 在本机运行 {#local}

只需要安装 Docker（Compose v2.17+）。第一次启动要构建镜像，需要等一段时间。

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

最后一条命令会显示 `admin` 的初始口令。打开 <http://127.0.0.1:8088> 登录，第一次登录要先修改口令。

![登录后看到的工作台](/screenshots/pc-workbench.png)

登录以后可以先看这几处：

| 想看什么 | 菜单 |
| --- | --- |
| 用户、角色和菜单权限 | 系统管理 |
| 流程设计和审批 | 工作流 |
| 地图、图层和三维场景 | 地理信息 |
| 访问量、性能和会话回放 | 埋点分析 |

管理后台自己也接入了埋点 SDK。点开几个页面以后，「埋点分析」里就能看到刚才的访问数据。

要换端口和时区，或者想从源码启动，见[快速开始](/guide/getting-started)。

## 移动端组件演示 {#ms-ui}

ms-ui 的演示工程编译成了 H5，托管在这个站点上。

![演示工程的四个页面](/readme/uniappx-demo.png)

有两种看法：

- 在组件文档页里直接操作，可以从 [Button 按钮](/uniappx/components/button)看起。宽屏时演示在页面右侧的手机框里。
- 在新标签页里打开<a href="/demo/index.html" target="_blank">完整的演示工程</a>，首页按分组列出所有演示页。

窄屏时组件页没有手机框，点击底栏的「打开 H5 演示」。

## 部署只读演示站 {#readonly}

要把自己的一套环境公开给别人看，用后端的只读演示模式。访客能登录，能打开每个页面，但所有修改都会被拒绝。

<div class="ms-flow ms-flow--3">

1. 在普通模式下准备好访客账号和要展示的数据。
2. 生成三个低权限数据库账号的口令。
3. 叠加 `docker-compose.demo.yml` 重新启动。

</div>

每一步的命令、放行哪些请求，以及运维上要注意的事，见[只读演示模式](/boot/demo-mode)。

## 下一步

<div class="ms-cards">

- [快速开始](/guide/getting-started) 换端口和时区，或者把后端和管理后台从源码启动。
- [第一个事件](/track/first-event) 给自己的页面接入埋点 SDK，在看板里看到第一条数据。
- [ms-ui](/uniappx/) 组件库的用法，以及每个组件的文档。
- [只读演示模式](/boot/demo-mode) 部署一个访客改不了数据的演示站。

</div>
