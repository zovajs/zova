import { IModule } from '@cabloy/module-info';
import { ZovaConfig } from '../../core/app/config.js';
import { IMonkeyApp, IMonkeySystem, IMonkeyController } from './monkey.js';
import { Constructable } from '../../decorator/index.js';
import { ZovaLocaleOptionalMap } from '../../core/app/locale.js';

export interface PluginCabloyModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginCabloyOptions {
  modulesMeta: PluginCabloyModulesMeta;
  AppMonkey: Constructable<IMonkeyApp & IMonkeySystem & IMonkeyController>;
  locales: ZovaLocaleOptionalMap;
  config: ZovaConfig;
}
