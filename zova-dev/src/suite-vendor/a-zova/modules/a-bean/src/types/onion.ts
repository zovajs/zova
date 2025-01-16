import { ZovaOnionOptionsMeta } from '@cabloy/module-info';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

export type IOnionExecuteCustom<OPTIONS, ONIONNAME> = (
  onionSlice: IOnionSlice<OPTIONS, ONIONNAME>,
  data: any,
  next: Function,
) => any;

export type TypeUseOnionGlobalBaseOptions<T> = Omit<T, 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'>;

export interface IOnionOptionsEnable {
  enable?: boolean;
  meta?: IOnionOptionsMeta;
}

export type TypeOnionOptionsMatchRule<T> = T | RegExp | (T | RegExp)[];
export interface IOnionOptionsMatch<T extends string> {
  match?: TypeOnionOptionsMatchRule<T>;
  ignore?: TypeOnionOptionsMatchRule<T>;
}

export interface IOnionOptionsDeps<T> {
  dependencies?: T[] | T;
  dependents?: T[] | T;
}

export interface IOnionOptionsMeta extends ZovaOnionOptionsMeta {}

export interface IOnionOptionsBase<T extends string> extends IOnionOptionsEnable, IOnionOptionsMatch<T> {}

export interface IOnionSlice<OPTIONS = unknown, ONIONNAME = string, T = unknown> {
  name: ONIONNAME;
  options: OPTIONS;
  beanFullName: string;
  beanInstance?: T;
}

export interface IOnionItem<OPTIONS = unknown, ONIONNAME = string> {
  name: ONIONNAME;
  options?: Partial<OPTIONS>;
}

export interface ConfigOnions {}

declare module 'zova' {
  export interface ZovaConfig {
    onions: ConfigOnions;
  }
}
