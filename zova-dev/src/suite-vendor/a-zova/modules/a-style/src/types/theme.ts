import type { IBeanRecord, OmitNever, PowerPartial } from 'zova';
import type { ServiceOnion } from 'zova-module-a-bean';
import type { ThemeToken } from 'zova-module-home-base';

export interface IThemeRecord {}

export interface IDecoratorThemeOptions {
  token?: (params: IThemeApplyParams) => PowerPartial<ThemeToken>;
}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    theme: ServiceOnion<IDecoratorThemeOptions, keyof IThemeRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    theme: OmitNever<IThemeRecord>;
  }

  export interface IBeanSceneRecord {
    theme: never;
  }
}

export interface IThemeApplyParams {
  name: string;
  dark: boolean;
}

export interface IThemeApplyResult {
  handler?: keyof IBeanRecord;
}

export interface IThemeBase {
  apply(params: IThemeApplyParams): Promise<IThemeApplyResult>;
}

export interface IThemeHandler {
  apply(result: IThemeHandlerApplyParams): Promise<void>;
}

export interface IThemeHandlerApplyParams {
  name: string;
  dark: boolean;
}
