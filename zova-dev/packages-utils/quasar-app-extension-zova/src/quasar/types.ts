import { ZovaConfigMeta } from '@cabloy/module-info';
import { ZovaViteConfigOptions, ZovaViteConfigResult } from 'zova-vite';

export interface ConfigContext {
  configMeta?: ZovaConfigMeta;
  configOptions?: ZovaViteConfigOptions;
  zovaViteMeta?: ZovaViteConfigResult;
}
