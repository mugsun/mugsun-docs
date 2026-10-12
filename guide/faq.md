# 常见问题

**Q：有没有在线演示？**  
A：管理台 / 埋点全链路暂无公网演示，请按 [快速开始](/guide/getting-started) 本地启动。ms-ui 组件文档页右下角有 H5 手机预览。详见 [演示说明](/demo)。

**Q：mugsun 的定位是什么？**  
A：全栈平台，强调嵌入式埋点竖切与可选 GIS/AI，不做功能墙低代码。禁止宣传「兼容 / 替代某某商业套件」。

**Q：cloud / uniappx-ui / ms-ui 怎么装？**  
A：cloud（微服务）仍规划中，尚未开放安装。**ms-ui** 是 uni-app x 跨端组件库（不是 PC 管理台），文档见 [ms-ui](/uniappx/)；源码仓 `mugsun-uniappx-ui` 目前为私有。

**Q：埋点会不会默认录屏幕上的文字？**  
A：产品目标是隐私默认安全（遮罩、脱敏、尊重 DNT）。以 [隐私与合规](/track/privacy) 为准；实现细节随版本更新。

**Q：许可证？**  
A：boot/core 为 Apache-2.0；pc/track 多为 MIT（pc 衍生自 art-design-pro，须保留 NOTICE）。以各仓 LICENSE 为准。

**Q：compose 会不会把应用也起起来？**  
A：不会。boot 仓的 `docker compose` 只起 PostgreSQL 与 Redis；应用用 Maven / JAR 运行。见 [快速开始](/guide/getting-started)。
