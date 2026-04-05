# 组件

## 代码风格

Zova 提供了一种更直观、更优雅、更强大的代码风格，汲取了 Vue3+React+Angular 以下核心设计：

- `Vue3`: 直观的状态管理
- `React`: 灵活的 TSX 渲染
- `Angular`: 强大的 IOC 容器

## 创建组件

以模块`demo-student`为例，创建一个组件`card`

### 1. Cli命令

```bash
$ zova :create:component card --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Zova Create/Component`
:::

依据提示输入组件名称`card`，VSCode 插件会自动创建组件的代码骨架

## 使用子组件

### 常规用法

在父组件中可以直接按常规用法使用子组件：

```typescript
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <Card></Card>
    );
  }
}
```

### 推荐用法

在模块中创建的子组件，自然是属于模块的资源。Zova 自动为每个子组件分配了一个唯一的名称（添加前缀`Z`），用于在模块内部以及跨模块使用

比如，子组件`card`属于模块`demo-basic`，那么，分配的唯一名称就是`ZCard`，那么可以采用如下方式使用子组件

```typescript
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

- 这种方式可以更好的支持组件的自动导入

## 跨模块使用子组件

在其他模块使用模块`demo-basic`的子组件`card`，可以采用如下方式：

```typescript
import { ZCard } from 'zova-module-demo-basic';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

::: info
基于编译器的加持， ZCard 会自动转为异步加载模式，具体而言就是：系统会异步加载模块`demo-basic`，然后取得子组件`card`，再进行组件渲染
:::
