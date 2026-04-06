# $api

Zova 在`$fetch`基础上提供面向业务的 API 服务

## 创建Api

在模块 demo-student 中创建一个 api 服务`menu`，用于封装获取菜单的 api 调用

### 1. Cli命令

```bash
$ zova :create:bean api menu --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Zova Create/Api`
:::

依据提示输入 api 的名称`menu`，VSCode 插件会自动添加 api 的代码骨架

## 定义Api

`src/module/demo-student/src/api/menu.ts`

```typescript
export interface ApiMenuRetrieveMenusResult {
  title: string;
  link: string;
}

@Api()
export class ApiMenu extends BeanApiBase {
  retrieveMenus() {
    return this.$fetch.get<any, ApiMenuRetrieveMenusResult>('/home/base/menu/');
  }
}
```

## 使用Api

可以通过 Scope 实例直接访问 Api

```diff
class ControllerTest {
  async test() {
+   const menus = await this.scope.api.menu.retrieveMenus();
  }
}
```

## 跨模块使用Api

```diff
+ import { ScopeModuleDemoStudent } from 'zova-module-demo-student';

class ControllerOther {
+ @UseScope()
+ $$scopeDemoStudent: ScopeModuleDemoStudent;

  async test() {
+   const res = await this.$$scopeDemoStudent.api.test.echo();
  }
}
```
