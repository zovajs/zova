# Introduction

## What is Zova?

Zova is a more intuitive frontend framework, = Vue3(intuitive state management) + React(flexible TSX rendering) + Angular(powerful IOC container)

- Built-in out-of-the-box SSR solution, building `SSR/SPA/Website/Admin-Dashboard` all in one codebase
- Pioneers dual-layer tabs navigation UI/UX, allowing more convenient switching between multiple pages
- Dynamically render CRUD list pages, entry pages, and search forms, and provides the best practices of `Tanstack Table/Tanstack Form/Tanstack Query`
- Offers powerful IOC + AOP capabilities, making the system more extensible and maintainable

## With UI libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- Daisyui
- Quasar
- Vuetify
- Empty: Other UI libraries can be used based on this empty template

## Demo Online 1

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## Demo Online 2

The Website and Admin-Dashboard of Cabloy Store are built by one codebase

- Website: [https://cabloy.com](https://cabloy.com)
- Admin-Dashboard: [https://cabloy.com/admin](https://cabloy.com/admin)

## GIF Demo

- Pioneers dual-layer tabs navigation UI/UX

![](../../assets/img/start/cabloy-start-two-level-tabs.gif)

## Coding style: Vue+React+Angular

Zova absorbs the essence of `Vue3/React/Angular` and avoid their shortcomings to make our development experience more elegant and reduce mental burden

1. `Vue3`: Zova still uses Vue3's intuitive reactive api system, but defining reactive variables is just like defining native variables, without the need to use `ref/reactive`, and naturally without `ref.value`
2. `React`: Zova uses the TSX syntax to write rendering logic, which not only perfectly matches the TS type system, but also supports the splitting of rendering code, and can keep the code clean and elegant even in the face of complex business. In Zova, there are no many Hook Apis like React, which greatly reduces mental burden
3. `Angular`: In actual development, there are three scenarios of state sharing: `state sharing of component internal`, `state sharing between components` and `global state sharing`. In the traditional Vue3, different mechanisms are used to achieve these state sharing scenes, while only a unified IOC container mechanism is needed in Zova. The IOC container provided by Zova abandons the cumbersome design of Angular, with clearer concepts and more powerful functions

## Features

- `SSR`: Built-in out-of-the-box SSR solution, building `SSR/SPA/Website/Admin-Dashboard` all in one codebase
- `Dual-layer Tabs UI/UX`: Pioneers dual-layer tabs navigation UI/UX, allowing more convenient switching between multiple pages
- `CRUD Dynamic Rendering`: Dynamically render CRUD list pages, entry pages, and search forms, and provides the best practices of `Tanstack Table/Tanstack Form/Tanstack Query`
- `Reactivity`: With the support of ioc container, defining reactive states no longer needs `ref/reactive`. Without `ref`, naturally there is no need to write a lot of `ref.value`
- `CSS-in-JS`: Built-in CSS-in-JS capability making style development more flexible and convenient, while providing out-of-the-box theme switching capabilities
- `Unified state management`: Encapsulating unified state data through model mechanism, including Cookie, Localstorage and server-side data managed by TanStack Query
- `IOC + AOP`: Offers powerful IOC + AOP capabilities, making the system more extensible and maintainable

## Technology Stack

### Core

| Name           | Version  |
| -------------- | -------- |
| Vite           | >=8.0.0  |
| Vue            | >=3.5.6  |
| Vue Router     | >=4.4.5  |
| Zod            | >=4.1.13 |
| Tanstack Query | >=5.92.5 |
| Tanstack Form  | >=1.23.5 |
| Tanstack Table | >=8.21.3 |

### UI Libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box

| Name        | Version  |
| ----------- | -------- |
| Daisyui     | >=5.3.2  |
| Tailwindcss | >=4.1.14 |
| Quasar      | >=2.18.1 |
| Vuetify     | >=4.0.1  |

## Philosophy

Many frameworks use the simplest use cases to demonstrate design elegance, ignoring the coding challenges presented by business complexity. As business grows and changes, project code quickly degrades and becomes difficult to maintain. Zova, however, addresses the complexity of large-scale businesses and proposes a series of engineering solutions. This allows us to maintain elegant and intuitive code even when developing large-scale business systems, improving development efficiency and experience while facilitating subsequent code iteration and maintenance

## Stay In Touch

- [Twitter](https://x.com/zhennann2024)
- [Bilibili](https://space.bilibili.com/454737998)

## Thanks

- Thanks to Angular that ioc container of Zova was in part inspired by Angular
- Thanks to React that React’s pioneering JSX syntax has significantly improved the efficiency and experience of front-end development
- Thanks to Vue that Vue provides a very powerful reactive system and ecosystem. Without the support of these ecosystems, Zova would be difficult to implement

## License

MIT License

Copyright (c) 2016-present, Zova
