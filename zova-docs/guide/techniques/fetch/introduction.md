# Fetch

Zova provides a module `home-base`, which provides a basic `Fetch` code skeleton based on [axios](https://axios-http.com). Custom API logic can be added on this basis, or even the `axios` underlying library can be directly replaced

## $fetch

- Zova injects the `$fetch` object into the `BeanBase` base class, so that the `axios` instance can be obtained through `this.$fetch` in any bean instance
- Zova also injects the `$fetch` object in `app.meta`, so that the `axios` instance can be accessed outside the bean instance

For example, load menu data:

`src/suite/a-home/modules/home-layout/src/api/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ApiMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

## home-api.bean.fetch

The module `home-base` provides an `home-api.bean.fetch` bean, in which custom logic can be added directly

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
