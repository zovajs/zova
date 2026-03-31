# How Intuitive, Elegant, and Powerful?🔥

Projects developed on Zova provide great capabilities while keeping the code intuitive and elegant at all times. Let's take a look at how to do it

## Intuitive: Reactive System

Zova still uses Vue3's intuitive reactive system, but defining reactive variables is like a native variable, without using `ref/reactive`, and naturally without `ref.value`

### Examples

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

## Elegance: Global State Management: 4-in-1

In actual development, you will encounter four types of global state data: `asynchronous data (usually from the server)` and `synchronous data`, while `synchronous data` is divided into three types: `localstorage`, `cookie`, and `memory`. In the traditional Vue3, different mechanisms are used to handle these state data, while only a unified `Model` mechanism is needed in Zova

| Global State Data | Traditional Vue3     | Zova  |
| ----------------- | -------------------- | ----- |
| asynchronous data | Pinia                | Model |
| localstorage      | Pinia + Localstorage | Model |
| cookie            | Pinia + Cookie       | Model |
| memory            | Pinia                | Model |

The model mechanism can be used to manage these global state data in a unified manner, which can automatically support SSR, standardize data usage, simplify code structure, and improve code maintainability

### Example: How to define

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

> Some people may ask, why don't you just use `this.data1 = 'some value'` for memory state data？
>
> > Because in the SSR scenario, the memory state data defined on the server needs to be hydrated to the client, then `$useStateMem` needs to be used

### Example: How to use

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

## Elegance: State Sharing: 4-in-1

In actual development, the state sharing of three scenes will be encountered: `state sharing of component internal`, `state sharing between components` and `global state sharing`. In the traditional Vue3, different mechanisms are used to achieve these state sharing scenes, while only a unified IOC container mechanism is needed in Zova

In actual development, there are four scopes of state sharing: 'internal component state sharing', 'state sharing between components', 'global state sharing', and 'system state sharing'. In traditional Vue3, different mechanisms are used to implement them, while in Zova, only a unified IOC container mechanism is required

| Scenario                         | Traditional Vue3 | Zova |
| -------------------------------- | ---------------- | ---- |
| Component Internal State Sharing | Composable       | IOC  |
| State sharing between components | Provide/Inject   | IOC  |
| Global State Sharing             | Pinia            | IOC  |
| System State Sharing             | ES Module        | IOC  |

> Some people may ask, what is the difference between 'global state sharing' and 'system state sharing'?
>
> > Because in SSR scenarios, 'global state sharing' is for requests, and 'system state sharing' can span requests

### Example: Create a service

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

### Example: Dependency injection

```typescript
import { ServiceData } from '.. /.. /service/data.js';

class ControllerPageTest {
Internal state sharing of components
@Use()
$$serviceData: ServiceData;

State is shared between components
@Use({ injectionScope: 'host' })
$$serviceData2: ServiceData;

Global state sharing
@Use({ injectionScope: 'app' })
$$serviceData3: ServiceData;

System state sharing
@Use({ injectionScope: 'sys' })
$$serviceData4: ServiceData;
}
```

## Powerful: IOC + AOP

IOC containers are effective architectural designs for system decoupling and support tools for large-scale business system development. Zova provides powerful AOP programming capabilities on top of IOC containers, making the system unmatched scalability and maintainability

Zova's AOP programming includes: 'Inner Facet', 'Outer Facet', 'Behavior', 'Interceptor'. Here are just two examples:

### Example: Internal section

Taking the previous class 'ControllerPageCounter' as an example, to output the execution time of the render method in the console, the code is as follows:

```diff
import { Log } from 'zova-module-a-logger';

class ControllerPageCounter {
+ @Log()
protected render() {
...
}
}
```

The console output is as follows:

! [](.. /.. /assets/img/start/why-001.png)

### Example: External facet

It is also possible to cut into the Log logic from the outside without changing the source code of the Class 'ControllerPageCounter'

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

The console output is as follows:

! [](.. /.. /assets/img/start/why-002.png)
