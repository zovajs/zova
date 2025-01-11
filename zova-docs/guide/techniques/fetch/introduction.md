# Fetch

Zova provides a module `home-base`, which provides a basic `Fetch` code skeleton based on [axios](https://axios-http.com). Custom API logic can be added on this basis, or even the `axios` underlying library can be directly replaced

## $fetch

- Zova injects the `$fetch` object into the `BeanBase` base class, so that the `axios` instance can be obtained through `this.$fetch` in any bean instance
- Zova also injects the `$fetch` object in `app.meta`, so that the `axios` instance can be accessed outside the bean instance

For example, load menu data:

`src/suite/a-home/modules/home-layout/src/service/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ServiceMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

## home-base.bean.api

The module `home-base` provides an `home-base.bean.api` bean, in which custom logic can be added directly

`src/suite/a-home/modules/home-base/src/bean/bean.api.ts`

```typescript{7}
export class BeanApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = this.app.util.getApiBaseURL();
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
    // your custom logic maybe here
  }

  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }
}
```
