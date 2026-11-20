# ms-ui (uni-app x)

ms-ui is the mugsun component library for uni-app x. It targets apps, mini programs and H5. Components are written in vapor mode and UTS, and every tag starts with `ms-`.

The core library has 111 components, and there are 8 optional plugins. Each component has its own page that lists props, events and slots.

![Four pages of the demo project](/readme/uniappx-demo.png)

From left to right, the screenshot shows the home, button, chart and settings pages of the demo project. The home page uses the dark theme.

## Where to start

<div class="ms-cards">

- [Button](/en/uniappx/components/button) Start with the most common component. Its demo runs in the phone frame on the right of the page.
- [Form](/en/uniappx/components/form) The form container, used together with `ms-form-item`.
- [Config Provider](/en/uniappx/components/config-provider) Give a whole area its own theme, for example switch it to dark.
- [Chart](/en/uniappx/components/chart) An optional plugin that draws eight chart types on canvas, such as line, bar and pie.

</div>

## Try the demos

Component pages with a demo are interactive. On wide screens the demo runs in the phone frame on the right of the page. On narrow screens, tap the H5 demo bar at the bottom.

You can also open the <a href="/demo/index.html" target="_blank">full demo project</a> in a new tab. Its home page lists every demo page by group.

## Use it in a project

The components live in the `uni_modules/ms-ui` directory of your project. easycom registers them automatically, so you write the tags directly without any import:

```vue
<template>
  <ms-button theme="primary" @click="save">Save</ms-button>
  <ms-button variant="outline" size="sm">Cancel</ms-button>
</template>

<script setup lang="uts">
function save() : void {
  console.log('save')
}
</script>
```

Import the theme and the icon font in the styles of `App.uvue`:

```scss
@import '@/uni_modules/ms-ui/styles/theme.scss';
@import '@/uni_modules/ms-ui/styles/remixicon-mp-face.scss';
```

The second line is the icon font for WeChat mini programs. You can leave it out if you only run on Web and App.

::: info The source repository is not public yet
ms-ui is released under the MIT License, and its source repository is not public yet. It is not published to npm or listed on the DCloud plugin market.
:::

## Platforms and versions

| Item | Description |
| --- | --- |
| HBuilderX | 5.23 or later |
| Runtime mode | uni-app x vapor mode |
| Verified platforms | Web, WeChat mini programs and iOS |
| Not verified yet | Android and HarmonyOS |

The tables below list every component by group.

## Basic

| Component | Tag |
| --- | --- |
| [Badge](/en/uniappx/components/badge) | `ms-badge` |
| [Button](/en/uniappx/components/button) | `ms-button` |
| [Cell](/en/uniappx/components/cell) | `ms-cell` |
| [Cell Group](/en/uniappx/components/cell-group) | `ms-cell-group` |
| [Config Provider](/en/uniappx/components/config-provider) | `ms-config-provider` |
| [Divider](/en/uniappx/components/divider) | `ms-divider` |
| [Empty](/en/uniappx/components/empty) | `ms-empty` |
| [Icon](/en/uniappx/components/icon) | `ms-icon` |
| [Image](/en/uniappx/components/image) | `ms-image` |
| [Link](/en/uniappx/components/link) | `ms-link` |
| [Loading](/en/uniappx/components/loading) | `ms-loading` |
| [Overlay](/en/uniappx/components/overlay) | `ms-overlay` |
| [Sheet](/en/uniappx/components/sheet) | `ms-sheet` |
| [Tag](/en/uniappx/components/tag) | `ms-tag` |
| [Text](/en/uniappx/components/text) | `ms-text` |
| [Transition](/en/uniappx/components/transition) | `ms-transition` |

## Form

| Component | Tag |
| --- | --- |
| [Calendar](/en/uniappx/components/calendar) | `ms-calendar` |
| [Cascader](/en/uniappx/components/cascader) | `ms-cascader` |
| [Checkbox](/en/uniappx/components/checkbox) | `ms-checkbox` |
| [Checkbox Group](/en/uniappx/components/checkbox-group) | `ms-checkbox-group` |
| [Code Input](/en/uniappx/components/code-input) | `ms-code-input` |
| [Color Picker](/en/uniappx/components/color-picker) | `ms-color-picker` |
| [Form](/en/uniappx/components/form) | `ms-form` |
| [Form Item](/en/uniappx/components/form-item) | `ms-form-item` |
| [Input](/en/uniappx/components/input) | `ms-input` |
| [Input Tag](/en/uniappx/components/input-tag) | `ms-input-tag` |
| [Keyboard](/en/uniappx/components/keyboard) | `ms-keyboard` |
| [Mention](/en/uniappx/components/mention) | `ms-mention` |
| [Picker](/en/uniappx/components/picker) | `ms-picker` |
| [Picker City](/en/uniappx/components/picker-city) | `ms-picker-city` |
| [Picker Date](/en/uniappx/components/picker-date) | `ms-picker-date` |
| [Picker Selected](/en/uniappx/components/picker-selected) | `ms-picker-selected` |
| [Radio](/en/uniappx/components/radio) | `ms-radio` |
| [Radio Group](/en/uniappx/components/radio-group) | `ms-radio-group` |
| [Rate](/en/uniappx/components/rate) | `ms-rate` |
| [Search](/en/uniappx/components/search) | `ms-search` |
| [Sign Board](/en/uniappx/components/sign-board) | `ms-sign-board` |
| [Slide Verify](/en/uniappx/components/slide-verify) | `ms-slide-verify` |
| [Slider](/en/uniappx/components/slider) | `ms-slider` |
| [Stepper](/en/uniappx/components/stepper) | `ms-stepper` |
| [Switch](/en/uniappx/components/switch) | `ms-switch` |
| [Textarea](/en/uniappx/components/textarea) | `ms-textarea` |
| [Weekbar](/en/uniappx/components/weekbar) | `ms-weekbar` |

## Navigation & Layout

| Component | Tag |
| --- | --- |
| [Backtop](/en/uniappx/components/backtop) | `ms-backtop` |
| [Col](/en/uniappx/components/col) | `ms-col` |
| [Dropdown](/en/uniappx/components/dropdown) | `ms-dropdown` |
| [Footer](/en/uniappx/components/footer) | `ms-footer` |
| [Grid](/en/uniappx/components/grid) | `ms-grid` |
| [Grid Item](/en/uniappx/components/grid-item) | `ms-grid-item` |
| [Indexbar](/en/uniappx/components/indexbar) | `ms-indexbar` |
| [More](/en/uniappx/components/more) | `ms-more` |
| [Navbar](/en/uniappx/components/navbar) | `ms-navbar` |
| [Pagination](/en/uniappx/components/pagination) | `ms-pagination` |
| [Row](/en/uniappx/components/row) | `ms-row` |
| [Segmented](/en/uniappx/components/segmented) | `ms-segmented` |
| [Sidebar](/en/uniappx/components/sidebar) | `ms-sidebar` |
| [Steps](/en/uniappx/components/steps) | `ms-steps` |
| [Sticky](/en/uniappx/components/sticky) | `ms-sticky` |
| [Tabbar](/en/uniappx/components/tabbar) | `ms-tabbar` |
| [Tabs](/en/uniappx/components/tabs) | `ms-tabs` |
| [Title](/en/uniappx/components/title) | `ms-title` |

## Display

| Component | Tag |
| --- | --- |
| [Avatar](/en/uniappx/components/avatar) | `ms-avatar` |
| [Barcode](/en/uniappx/components/barcode) | `ms-barcode` |
| [Card](/en/uniappx/components/card) | `ms-card` |
| [Collapse](/en/uniappx/components/collapse) | `ms-collapse` |
| [Countdown](/en/uniappx/components/countdown) | `ms-countdown` |
| [Image Group](/en/uniappx/components/image-group) | `ms-image-group` |
| [Image Resizer](/en/uniappx/components/image-resizer) | `ms-image-resizer` |
| [Image Viewer](/en/uniappx/components/image-viewer) | `ms-image-viewer` |
| [Money](/en/uniappx/components/money) | `ms-money` |
| [Paragraph](/en/uniappx/components/paragraph) | `ms-paragraph` |
| [Progress](/en/uniappx/components/progress) | `ms-progress` |
| [Qrcode](/en/uniappx/components/qrcode) | `ms-qrcode` |
| [Result](/en/uniappx/components/result) | `ms-result` |
| [Rolling Number](/en/uniappx/components/rolling-number) | `ms-rolling-number` |
| [Scroll X](/en/uniappx/components/scroll-x) | `ms-scroll-x` |
| [Scroll X Item](/en/uniappx/components/scroll-x-item) | `ms-scroll-x-item` |
| [Skeleton](/en/uniappx/components/skeleton) | `ms-skeleton` |
| [Swiper](/en/uniappx/components/swiper) | `ms-swiper` |
| [Swiper Fx](/en/uniappx/components/swiper-fx) | `ms-swiper-fx` |
| [Table](/en/uniappx/components/table) | `ms-table` |
| [Text Cloud](/en/uniappx/components/text-cloud) | `ms-text-cloud` |
| [Tree](/en/uniappx/components/tree) | `ms-tree` |
| [Tree Flat](/en/uniappx/components/tree-flat) | `ms-tree-flat` |
| [Tree Select](/en/uniappx/components/tree-select) | `ms-tree-select` |
| [Virtual List](/en/uniappx/components/virtual-list) | `ms-virtual-list` |
| [Waterfall](/en/uniappx/components/waterfall) | `ms-waterfall` |
| [Watermark](/en/uniappx/components/watermark) | `ms-watermark` |

## Feedback

| Component | Tag |
| --- | --- |
| [Action Sheet](/en/uniappx/components/action-sheet) | `ms-action-sheet` |
| [Alert](/en/uniappx/components/alert) | `ms-alert` |
| [Animation](/en/uniappx/components/animation) | `ms-animation` |
| [Drawer](/en/uniappx/components/drawer) | `ms-drawer` |
| [Fab](/en/uniappx/components/fab) | `ms-fab` |
| [Guide](/en/uniappx/components/guide) | `ms-guide` |
| [Modal](/en/uniappx/components/modal) | `ms-modal` |
| [Modal Page](/en/uniappx/components/modal-page) | `ms-modal-page` |
| [Notice Bar](/en/uniappx/components/notice-bar) | `ms-notice-bar` |
| [Popover](/en/uniappx/components/popover) | `ms-popover` |
| [Popup](/en/uniappx/components/popup) | `ms-popup` |
| [Pull Refresh](/en/uniappx/components/pull-refresh) | `ms-pull-refresh` |
| [Snackbar](/en/uniappx/components/snackbar) | `ms-snackbar` |
| [Swipe Cell](/en/uniappx/components/swipe-cell) | `ms-swipe-cell` |
| [Toast](/en/uniappx/components/toast) | `ms-toast` |
| [Upload](/en/uniappx/components/upload) | `ms-upload` |

## Media

| Component | Tag |
| --- | --- |
| [Barrage](/en/uniappx/components/barrage) | `ms-barrage` |
| [Chat](/en/uniappx/components/chat) | `ms-chat` |
| [Devtool](/en/uniappx/components/devtool) | `ms-devtool` |
| [Drag](/en/uniappx/components/drag) | `ms-drag` |
| [Drag Item](/en/uniappx/components/drag-item) | `ms-drag-item` |
| [Finger](/en/uniappx/components/finger) | `ms-finger` |
| [View To Full](/en/uniappx/components/view-tofull) | `ms-view-tofull` |

## Optional plugins

| Component | Tag |
| --- | --- |
| [Blur](/en/uniappx/components/blur) | `ms-blur` · optional plugin |
| [Camera](/en/uniappx/components/camera) | `ms-camera` · optional plugin |
| [Chart](/en/uniappx/components/chart) | `ms-chart` · optional plugin |
| [Editor](/en/uniappx/components/editor) | `ms-editor` · optional plugin |
| [Graph](/en/uniappx/components/graph) | `ms-graph` · optional plugin |
| [Markdown](/en/uniappx/components/markdown) | `ms-markdown` · optional plugin |
| [Svg](/en/uniappx/components/svg) | `ms-svg` · optional plugin |
| [Webview](/en/uniappx/components/webview) | `ms-webview` · optional plugin |

