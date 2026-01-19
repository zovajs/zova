import type { OmitNever } from 'zova';
import type { ServiceOnion } from 'zova-module-a-bean';
import type { IRenderContextBase } from 'zova-module-a-openapi';

export type NextActionExecute = (res?: any) => any | Promise<any>;

export interface IActionsRecord {}

export interface IActionRecord {}

export interface IActionExecute {
  execute(options: IDecoratorActionOptions, renderContext: IRenderContextBase, next: NextActionExecute): any | Promise<any>;
}

export interface IDecoratorActionOptions {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    action: ServiceOnion<IDecoratorActionOptions, keyof IActionRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    action: OmitNever<IActionRecord>;
  }

  export interface IBeanSceneRecord {
    action: never;
  }
}
