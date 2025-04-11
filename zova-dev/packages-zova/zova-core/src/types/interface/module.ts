import type { IModuleInfo } from '@cabloy/module-info';
import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { Component } from 'vue';
import type { ZovaSys } from '../../core/sys/sys.js';
import type { StateLock } from '../../utils/stateLock.js';
import type { IModuleMain, IMonkeyApp, IMonkeyController, IMonkeyModule } from './monkey.js';

export type TypeModuleResourceIcons = Record<string, string>;
export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;
export type TypeModuleResourceComponents = Record<string, Component>;
export type TypeModuleResourceConfig = (sys: ZovaSys, meta?: ZovaConfigMeta) => object | Promise<object>;

export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeyApp & IMonkeyController;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: TypeModuleResourceConfig;
  constants: unknown;
  icons: TypeModuleResourceIcons;
  components: TypeModuleResourceComponents;
}

export const SymbolInstalled = Symbol('SymbolInstalled');

declare module '@cabloy/module-info' {
  export interface IModule {
    /** @internal */
    [SymbolInstalled]: StateLock;
    resource: IModuleResource; // IModuleResource | Promise<IModuleResource>;
    info: IModuleInfo;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeyApp & IMonkeyController;
  }
}
