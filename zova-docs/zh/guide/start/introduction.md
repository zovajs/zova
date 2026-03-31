# 简介

## 什么是Zova？

Zova 是一款更直观的前端框架，= Vue3(直观的状态管理) + React(灵活的 TSX 渲染) + Angular(强大的 IOC 容器)

- 内置开箱即用的 SSR 解决方案，可在同一个代码库中实现`SSR/SPA/Web网站/Admin中后台`
- 首创双层页签导航 UI/UX，可以更加便捷的在多个页面中切换
- 可动态渲染 CRUD 的列表页、条目页、搜索表单，并且提供了`Tanstack Table/Tanstack Form/Tanstack Query`的最佳实践
- 提供强大的 IOC + AOP 能力，让系统具有无与伦比的可扩展性和可维护性

## 与UI库的配合

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- Daisyui
- Quasar
- Vuetify
- Empty：可以在此基础上使用其他 UI 库

## 在线演示1

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## 在线演示2

使用同一套代码实现 Cabloy Store 的`Web网站`和`Admin中后台`

- Web 网站：[https://cabloy.com](https://cabloy.com)
- Admin 中后台：[https://cabloy.com/admin](https://cabloy.com/admin)

## 动图演示

- 首创双层页签导航 UI/UX

![](../../assets/img/start/cabloy-start-two-level-tabs.gif)

## 代码风格：Vue+React+Angular

Zova 汲取`Vue3/React/Angular`的精华，规避他们的缺点，让我们的开发体验更加优雅，减轻心智负担

1. `Vue3`：Zova 仍然使用 Vue3 直观的响应式系统，但是定义响应式变量就像原生变量一样，不需要使用`ref/reactive`，自然也不需要`ref.value`
2. `React`：Zova 使用 TSX 语法来书写渲染逻辑，不仅可以与 TS 类型系统完美契合，也可以支持渲染代码的拆分，即便是面对复杂业务也可以保持代码的舒展与优雅。在 Zova 中没有类似 React 的众多 Hook Api，大量减轻心智负担
3. `Angular`：在实际开发当中，会遇到三个场景的状态共享：`组件内部状态共享`、`组件之间状态共享`、`全局状态共享`。在传统的 Vue3 当中，分别采用不同的机制来实现，而在 Zova 中只需要采用统一的 IOC 容器机制即可。Zova 提供的 IOC 容器，摒弃了 Angular 繁琐的设计，概念更加清晰，功能更加强大

## 特性

- `SSR`：内置开箱即用的 SSR 解决方案，可在同一个代码库中实现`SSR/SPA/Web网站/Admin中后台`
- `双层页签UI/UX`：首创双层页签导航 UI/UX，可以更加便捷的在多个页面中切换
- `CRUD动态渲染`：可动态渲染 CRUD 的列表页、条目页、搜索表单，并且提供了`Tanstack Table/Tanstack Form/Tanstack Query`的最佳实践
- `响应式系统`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`。因为不用`ref`，自然也就不用再写大量的`ref.value`
- `CSS-in-JS`：内置 CSS-in-JS 的能力，让样式的开发更加灵活、便捷，同时提供了开箱即用的主题切换能力
- `统一状态管理`：采用统一的 Model 机制封装状态数据，包括 Cookie、Localstorage 和 TanStack Query 管理的服务端数据
- `IOC + AOP`：提供强大的 IOC + AOP 能力，让系统具有无与伦比的可扩展性和可维护性

## 技术栈

### 核心

| 名称           | 版本     |
| -------------- | -------- |
| Vite           | >=8.0.0  |
| Vue            | >=3.5.6  |
| Vue Router     | >=4.4.5  |
| Zod            | >=4.1.13 |
| Tanstack Query | >=5.92.5 |
| Tanstack Form  | >=1.23.5 |
| Tanstack Table | >=8.21.3 |

### UI库

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用

| 名称        | 版本     |
| ----------- | -------- |
| Daisyui     | >=5.3.2  |
| Tailwindcss | >=4.1.14 |
| Quasar      | >=2.18.1 |
| Vuetify     | >=4.0.1  |

## 架构哲学

许多框架使用最简短的用例来证明设计是否优雅，而忽略了业务复杂性带来的编码挑战。随着业务的增长和变更，项目代码迅速劣化，难以维护。而 Zova 正视大型业务的复杂性，提出一系列工程化的解决方案，让我们在开发大型业务系统时，一样可以让代码保持优雅、直观，从而提升开发效率和开发体验，更有利于后续代码迭代与维护

## 联系方式

- [Twitter](https://x.com/zhennann2024)
- [B站：濮水代码](https://space.bilibili.com/454737998)

## 致谢

- 向 Angular 表达感谢，Angular 激发了在 Vue 中实现 ioc 容器的灵感
- 向 React 表达感谢，React 首创的 JSX 语法显著提升了前端的开发效率和开发体验
- 向 Vue 表达感谢，Vue 提供了非常强大的响应式系统和生态。如果没有这些生态的支持，Zova 的实现将非常困难

## License

MIT License

Copyright (c) 2016-present, Zova
