# Api

模块可以集中管理后端 Api 调用，把 Api 调用包装为`Api`资源，从而方便在任何模块访问

## 创建Api

::: tip
右键菜单 - [模块路径]: `Zova Create/Api`
:::

依据提示输入 api 的名称，比如`menu`，VSCode 插件会自动添加 api 的代码骨架

以模块`home-layout`为例，通过调用 Api`/home/layout/menu/select`获取菜单。那么，可以按如下方式定义 Api 服务：

`src/suite/a-home/modules/home-layout/src/api/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$fetch.get<any, ApiMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

- 关于`$fetch`的用法，参见：[Fetch](../../techniques/fetch/introduction.md)

## 使用Api

可以通过 Scope 实例直接访问 Api

`src/suite/a-home/modules/home-layout/src/bean/model.menu.ts`

```typescript
const data = await this.scope.api.menu.select();
```

## 跨模块使用Api

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

## 举例：CRUD

下面以 Todo 的 CRUD 为例：

### 定义Api服务

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

### 使用Api

`src/suite/a-demo/modules/demo-todo/src/bean/model.todo.ts`

```typescript
await this.scope.api.todo.select();
await this.scope.api.todo.get(params);
await this.scope.api.todo.insert(params);
await this.scope.api.todo.update(params);
await this.scope.api.todo.delete(params);
```
