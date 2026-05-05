import type { OmitNever } from 'zova';
import type { ServiceOnion } from 'zova-module-a-bean';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';

export const SymbolActionResult = Symbol('SymbolActionResult');

export type TypeActionOptionsRest<T> = Omit<T, typeof SymbolActionResult> & { res?: string };

export type NextActionExecute = (res?: any) => any | Promise<any>;

export interface IActionRecord {}

export interface IActionExecute {
  execute(options: IDecoratorActionOptions, renderContext: IJsxRenderContextBase, next: NextActionExecute): any | Promise<any>;
}

export interface IDecoratorActionOptions<Result = any> {
  [SymbolActionResult]: Result;
  // res?: string; // need not define here
}

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
