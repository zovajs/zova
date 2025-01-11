# Fetch

Zova 提供了一个模块`home-base`，该模块基于[axios](https://axios-http.com)提供了基本的`Fetch`代码骨架。可以在此基础上添加自定义的 API 逻辑，甚至也可以直接替换掉`axios`底层库

## $fetch

- Zova 在`BeanBase`基类中注入了`$fetch`对象，从而可以在任何 bean 实例中通过`this.$fetch`访问`axios`实例
- Zova 同时在`app.meta`中注入了`$fetch`对象，从而可以在 bean 实例的外部访问`axios`实例

比如，获取菜单数据：

`src/suite/a-home/modules/home-layout/src/api/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ApiMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

## home-api.bean.fetch

模块`home-api`提供了一个`home-api.bean.fetch`bean，可以直接在里面添加自定义逻辑

`src/suite/a-home/modules/home-api/src/bean/bean.fetch.ts`

```typescript{7}
export class BeanFetch {
  private [SymbolFetch]: AxiosInstance;

  protected async __init__() {
    const baseURL = this.app.util.getApiBaseURL();
    this[SymbolFetch] = markRaw(axios.create({ baseURL }));
    // your custom logic maybe here
  }

  protected __get__(prop) {
    return this[SymbolFetch] && this[SymbolFetch][prop];
  }
}
```
