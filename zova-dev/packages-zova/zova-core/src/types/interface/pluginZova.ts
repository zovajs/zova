import type { IModule } from '@cabloy/module-info';
import type { RouteRecordRaw } from 'vue-router';
import type { ZovaLocaleOptionalMap } from '../../core/app/locale.js';
import type { Constructable } from '../../decorator/index.js';
import type { TypeModuleResourceConfig } from './module.js';
import type { IMonkeyController, IMonkeyModule, IMonkeySystem } from './monkey.js';

export interface PluginZovaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginZovaOptions {
  modulesMeta: PluginZovaModulesMeta;
  locales: ZovaLocaleOptionalMap;
  config: TypeModuleResourceConfig[];
  AppMonkey?: Constructable<IMonkeyModule & IMonkeySystem & IMonkeyController>;
  legacyRoutes?: RouteRecordRaw[];
}
