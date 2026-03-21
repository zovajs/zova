import type { IModuleInfo } from '@cabloy/module-info';
import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { Component } from 'vue';

import type { ZovaSys } from '../../core/sys/sys.js';
import type { Constructable } from '../../decorator/type/constructable.js';
import type { StateLock } from '../../utils/stateLock.js';
import type { IModuleMain, IModuleMainSys, IMonkeyApp, IMonkeyController, IMonkeyModule, IMonkeyModuleSys, IMonkeySys } from './monkey.js';

export type TypeModuleResourceIcons = Record<string, string>;
export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<string, number>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;
export type TypeModuleResourceComponents = Record<string, Component>;
export type TypeModuleResourceConfig = (sys: ZovaSys, meta?: ZovaConfigMeta) => object | Promise<object>;

export interface IModuleResource {
  MainSys: Constructable<IModuleMainSys>;
  MonkeySys: Constructable<IMonkeyModuleSys & IMonkeySys>;
  Main: Constructable<IModuleMain>;
  Monkey: Constructable<IMonkeyModule & IMonkeyApp & IMonkeyController>;
  locales: TypeModuleResourceLocales;
  errors: TypeModuleResourceErrors;
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
  }
}

export interface IModuleApp {
  /** @internal */
  [SymbolInstalled]: StateLock;
}
