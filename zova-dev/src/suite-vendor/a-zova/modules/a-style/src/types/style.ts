import type { style } from 'typestyle';
import type { IBeanRecord } from 'zova';
import type { BeanTheme } from '../bean/bean.theme.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
    $theme: BeanTheme;
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
  apply({ name, dark }: IThemeApplyParams): Promise<IThemeApplyResult>;
}

export interface IThemeHandler {
  apply(result: IThemeHandlerApplyParams): Promise<void>;
}

export interface IThemeHandlerApplyParams {
  name: string;
  dark: boolean;
}

declare module 'zova' {
  export interface IBeanSceneRecord {
    css: never;
    theme: never;
  }
}
