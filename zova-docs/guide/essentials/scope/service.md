# Api

Modules can centrally manage backend Api calls and package Api calls as `api` resources, making them easy to access in any module

## Create Api

::: tip
Context Menu - [Module Path]: `Zova Create/Api`
:::

Enter the name of api according to the prompt, such as `menu`. The VSCode extension will automatically create the code skeleton of `api`

Take the module `home-layout` as an example, and get the menu by calling the Api `/home/layout/menu/select`. Then, you can define the Api service as follows:

`src/suite/a-home/modules/home-layout/src/api/menu.ts`

```typescript
import { ZovaApplication } from 'zova';
import { ApiMenuEntity } from '../interface/menu.js';

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ApiMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

- For the usage of `$fetch`, see: [Fetch](../../techniques/fetch/introduction.md)

## Use API

You can directly access API through Scope instance

`src/suite/a-home/modules/home-layout/src/bean/model.menu.ts`

```typescript
const data = await this.scope.api.menu.select();
```

## Use API cross-module

```typescript
import { ScopeModuleHomeLayout } from 'zova-module-home-layout';

export class TestA {
  @UseScope()
  $$scopeModuleHomeLayout: ScopeModuleHomeLayout;

  protected async __init__() {
    const data = await this.$$scopeModuleHomeLayout.api.menu.select();
  }
}
```

## Example: CRUD

Let's take Todo's CRUD as an example:

### Define Api

`src/suite/a-demo/modules/demo-todo/src/api/todo.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ApiTodoEntity[]>('/demo/todo/select'),
    get: (params: ApiTodoGetParams) => app.meta.$fetch.get<any, ApiTodoEntity>('/demo/todo/get', { params }),
    insert: (params: ApiTodoIntertParams) =>
      app.meta.$fetch.post<any, void, ApiTodoIntertParams>('/demo/todo/insert', params),
    update: (params: ApiTodoUpdateParams) =>
      app.meta.$fetch.post<any, void, ApiTodoUpdateParams>('/demo/todo/update', params),
    delete: (params: ApiTodoDeleteParams) =>
      app.meta.$fetch.post<any, void, ApiTodoDeleteParams>('/demo/todo/delete', params),
  };
};
```

### Use Api

`src/suite/a-demo/modules/demo-todo/src/bean/model.todo.ts`

```typescript
await this.scope.api.todo.select();
await this.scope.api.todo.get(params);
await this.scope.api.todo.insert(params);
await this.scope.api.todo.update(params);
await this.scope.api.todo.delete(params);
```
