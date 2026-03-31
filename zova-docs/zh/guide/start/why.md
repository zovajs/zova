# 如何做到直观、优雅、强大?🔥

基于 Zova 开发的项目，在提供强大能力的同时，可以始终保持代码直观、优雅。下面我们就来看看是如何做到的

## 直观: 响应式系统

Zova 仍然使用 Vue3 直观的响应式系统，但是定义响应式变量就像原生变量一样，不需要使用`ref/reactive`，自然也不需要`ref.value`

### 举例

```typescript
class ControllerPageCounter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  protected render() {
    return (
      <div>
        <div>count: {this.count}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 优雅: 全局状态数据管理: 4合1

在实际开发当中，会遇到四类全局状态数据：`异步数据（一般来自服务端）`、`同步数据`。同步数据又分为三种：`localstorage`、`cookie`、`内存`。在传统的 Vue3 当中，分别采用不同的机制来处理这些状态数据，而在 Zova 中只需要采用统一的`Model`机制

| 状态数据     | 传统的Vue3           | Zova  |
| ------------ | -------------------- | ----- |
| 异步数据     | Pinia                | Model |
| localstorage | Pinia + Localstorage | Model |
| cookie       | Pinia + Cookie       | Model |
| 内存         | Pinia                | Model |

采用 Model 机制统一管理这些全局状态数据，可以自动支持 SSR，规范数据使用方式，简化代码结构，提升代码的可维护性

### 举例：如何定义

```typescript
import { BeanModelBase } from 'zova-module-a-model';

class ModelData extends BeanModelBase {
  data1?: string;
  data2?: string;
  data3?: string;

  protected async __init__() {
    // sync data
    this.data1 = this.$useStateMem({ queryKey: ['data1'] });
    this.data2 = this.$useStateCookie({ queryKey: ['data2'] });
    this.data3 = this.$useStateLocal({ queryKey: ['data3'] });
  }

  // async data
  data4() {
    return this.$useStateData({
      queryKey: ['data4'],
      queryFn: async () => {
        return await getDataFromServer();
      },
    });
  }
}
```

> 可能有人会问，内存状态数据为什么不直接使用`this.data1 = 'some value';`？
>
> > 因为在 SSR 场景中，在服务端定义的内存状态数据需要水合到客户端，这时就需要使用`$useStateMem`

### 举例：如何使用

```typescript
import { ModelData } from '../../model/data.js';

class ControllerPageTest {
  @Use()
  $$modelData: ModelData;

  // sync data
  handleSyncDataGet() {
    console.log(this.$$modelData.data1);
    console.log(this.$$modelData.data2);
    console.log(this.$$modelData.data3);
  }

  // sync data
  handleSyncDataSet() {
    this.$$modelData.data1 = 'new value';
    this.$$modelData.data2 = 'new value';
    this.$$modelData.data3 = 'new value';
  }

  // async data
  protected render() {
    const { data, error } = this.$$modelData.data4();
    if (error) {
      return <div>{error.message}</div>;
    }
    return <div>{data}</div>;
  }
}
```

## 优雅: 状态数据共享: 4合1

在实际开发当中，会遇到四个范围的状态数据共享：`组件内部状态共享`、`组件之间状态共享`、`全局状态共享`、`系统状态共享`。在传统的 Vue3 当中，分别采用不同的机制来实现，而在 Zova 中只需要采用统一的 IOC 容器机制

| 场景             | 传统的Vue3     | Zova |
| ---------------- | -------------- | ---- |
| 组件内部状态共享 | Composable     | IOC  |
| 组件之间状态共享 | Provide/Inject | IOC  |
| 全局状态共享     | Pinia          | IOC  |
| 系统状态共享     | ES Module      | IOC  |

> 可能有人会问，`全局状态共享`和`系统状态共享`有何区别？
>
> > 因为在 SSR 场景中，`全局状态共享`是针对Request而言的，`系统状态共享`则可以跨越Request

### 举例：创建服务

```typescript
class ServiceData {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 举例：依赖注入

```typescript
import { ServiceData } from '../../service/data.js';

class ControllerPageTest {
  // 组件内部状态共享
  @Use()
  $$serviceData: ServiceData;

  // 组件之间状态共享
  @Use({ injectionScope: 'host' })
  $$serviceData2: ServiceData;

  // 全局状态共享
  @Use({ injectionScope: 'app' })
  $$serviceData3: ServiceData;

  // 系统状态共享
  @Use({ injectionScope: 'sys' })
  $$serviceData4: ServiceData;
}
```

## 强大：IOC + AOP

IOC 容器是进行系统解耦行之有效的架构设计，也是应对大型业务系统开发的支撑工具。Zova 在 IOC 容器的基础上提供了强大的 AOP 编程能力，让系统具有无与伦比的可扩展性和可维护性

Zova 的 AOP 编程包括：`内部切面`、`外部切面`、`行为`、`拦截器`。在这里仅举两例：

### 举例：内部切面

以前面的 class `ControllerPageCounter`为例，要在控制台输出 render 方法的执行时间，代码如下：

```diff
import { Log } from 'zova-module-a-logger';

class ControllerPageCounter {
+ @Log()
  protected render() {
    ...
  }
}
```

控制台输出如下：

![](../../assets/img/start/why-001.png)

### 举例：外部切面

也可以不改变 Class `ControllerPageCounter`源码，而是从外部切入 Log 逻辑

```typescript
@Aop({ match: 'demo-student.controller.pageCounter' })
class AopCounterLog {
  render = (_args, next, _receiver) => {
    const timeBegin = Date.now();
    const res = next();
    const timeEnd = Date.now();
    console.log(`render: ${timeEnd - timeBegin}ms`);
    return res;
  };
}
```

控制台输出如下：

![](../../assets/img/start/why-002.png)

## 前言

Vue3 已经非常强大和灵活了，为什么还要引入 IOC 容器呢？

对于大型项目，经常会遇到一个业务组件包括大量状态和逻辑，放在一个 vue sfc 文件中代码冗长，不好维护。由于这些状态和逻辑相互交织和引用，既不便于拆分子组件，也不便于抽离组合式 api。可是为了方便阅读和维护，又想把代码拆分为多个文件，怎么办？
在 vue2 中可以拆分为多个 mixins，但是 mixins 没有类型，所以有许多缺点。
在 vue3 中可以拆分为多个 composables，但是在多个 composables 之间共享状态和逻辑不太方便。
在这种场景下，采用 IOC 容器就是更好的选择。

IOC 容器犹如一把钥匙，为我们打开了业务工程化的大门，允许我们探索更多工程化方面的设计和能力

## Class的应用场景

IOC 容器离不开 Class，那么我们就从 Class 谈起。一提起 Class，大家一定会想到这是 Vue 官方不再推荐的代码范式。其实，更确切的说，Vue 官方是不推荐基于 Class 来定义 Vue 组件。如图所示：

![](../../../assets/img/vue-class-component-deprecated.png)

社区确实有几款`基于Class定义组件`的方案，但实际应用效果不理想，所以不被 Vue 官方推荐。这些有价值的社区实践在不同阶段给 Vue 开发带来了便利，同时也恰恰说明一个道理：

::: info
Class 不应该用在`视图层`，而是要用到`业务层`
:::

- 以下是几款社区 Class 方案，供参考：
  - [vue-class-component](https://github.com/vuejs/vue-class-component)
  - [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)
  - [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
  - [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator)

## 两层架构设计

在面向大型的业务开发场景中，需要两个层面的架构设计：

1. `视图层`：这一层架构推荐使用`<script setup>`，因为通过编译器语法糖确实可以使用非常简明的代码来声明 props 和 emits 的类型
2. `业务层`：这一层与业务相关。大量的工程实践证明，对于业务的建模和抽象，`OOP`比`函数式`更适合

因此，在 Vue3 中引入 IOC 容器和 Class，与 Vue 官方的说法并不相悖，只是在业务层架构中应用`OOP`

## 两类IOC容器

Zova 提供了分层的 IOC 容器，具体而言，提供了两类 IOC 容器：

### 1. 全局容器

该容器与`Vue App`绑定，从而实现全局状态和逻辑的共享，因此可以直接代替`pinia`的能力

### 2. 组件实例容器

该容器与`Vue组件实例`绑定。提供组件实例级别容器的好处就是，在这个容器中的所有 Class 实例都可以在组件实例范围之内共享数据和逻辑

## 和 Mixins 的对比

下面是基于 IOC 容器的源码案例，可以与 Mixins 做对照分析：

- [布局组件](https://github.com/zovajs/zova/tree/main/zova-dev/src/suite/a-home/modules/home-layout/src/component/layoutDefault)

### 1. 解决mixins的短板

使用过 Vue2 的用户可能对`mixins`比较熟悉。`IOC容器`可以解决 mixins 的所有短板：

1. 不清晰的数据来源：在 IOC 中 Class 各司其职，可以很方便的对`this`溯源，定位其出处
2. 命名空间冲突：在 IOC 中 Class 实例都有自己的变量名，自然没有命名冲突的隐患
3. 隐式的跨 mixin 交流：通过 IOC 容器的托管，Class 实例可以非常方便的共享数据和逻辑，而且可以清晰定位其来源

- 参见：[Vue3: 和 Mixin 的对比](https://cn.vuejs.org/guide/reusability/composables.html#vs-mixins)

### 2. 吸收mixins的长处

`mixins`虽然有许多短板，但是有一个长处，就是多个`mixins`之间共享数据和逻辑非常方便。`组合式API`虽然也能实现数据和逻辑的共享，但是一旦调用链层级深了，使用起来就不太方便

- 我们可以看一张示意图：

![why-ioc-composable](../../../assets/img/why-ioc-composable.svg)

如图所示，一个 Vue 组件使用了两个 Composables，然后这两个 Composables 又分别使用了两个 Composables。那么，如果要在这 6 个 Composables 中共享状态和逻辑是非常不方便的，无法满足复杂业务的需求

- 我们再来看 IOC 容器的示意图：

![why-ioc-class](../../../assets/img/why-ioc-class.svg)

如图所示，一个 Vue 组件对应一个 IOC 容器，在 IOC 容器中注入了 6 个 Class 实例。这些 Class 实例由于都被 IOC 容器托管，所以可以相互引用，从而方便共享状态和逻辑

## 额外好处

基于 Vue3 强大而且灵活的响应式系统，IOC 容器在创建 Class 实例时自动包裹一层 reactive，那么就可以收到如下好处：

1. `不用ref/reactive`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`
2. `不用ref.value`：因为不用`ref`，自然也就不用再写大量的`ref.value`

## 概念辨析

### 有人说Zova中Java的味道很浓

其实，Zova 与 Java 的代码风格有显著的不同，体现在以下两个方面：

1. `更少的装饰器函数`：Zova 采用依赖注入与依赖查找相结合的策略，优先使用依赖查找，从而大量减少装饰器函数的使用
2. `更少的类型标注`：Zova 优先使用依赖查找可以达到`化类型于无形`的开发体验，也就是不需要标注类型就可以享受到类型编程的诸多好处，从而让我们的代码始终保持简洁和优雅，进而显著提升开发效率，保证代码质量

- 详细方案，参见：
  - [IOC控制反转: BeanBase](../essentials/ioc/bean-base.md)
  - [模块Scope](../essentials/scope/introduction.md)

### 有人说前端的技术趋势是组合优于继承，所以引入IOC是不合时宜的

其实，从本质上来看，IOC 容器的核心架构理念就是组合。通过 IOC 容器的托管，这些 Bean 实例可以更加自由灵活的组合，可以更加便利的共享状态和逻辑

## 社区文章

以下文章来自社区，观点可能有所偏颇，但对于理解不同框架的设计风格有许多助益：

- [React 十年——过去、现在和未来](https://zhuanlan.zhihu.com/p/675465137)

  > 摘录：事实上，如果在类组件上实现一个支持外部数据响应性和生命周期合并的简易依赖注入（只需要瞬态作用域），我们就可以拥有不逊于 Hooks 的复用能力。同时，一旦我们不小心额外加了几行代码，实现了单例作用域，那就顺便实现了状态管理功能，一脚把 Redux 踹进垃圾桶。是的，事情本就是这么简单。

## 演示：不用`ref/reactive`，不用`ref.value`

### 1. 定义响应式状态

在组件中定义一个响应式变量`count`，并且添加两个方法修改变量的值

```typescript
export class ControllerPageCounter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 使用响应式状态

采用 tsx 语法使用`count`

```typescript
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 演示：依赖注入

### 1. 逻辑抽离

将`count`逻辑抽离出来，创建一个`Service`Bean

```typescript
@Service()
export class ServiceCounter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 在组件中注入并使用

```typescript
export class ControllerPageCounter {
  @Use()
  $$counter: ServiceCounter;
}
```

```typescript
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.increment()}>Increment</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
