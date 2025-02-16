import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { ZovaViteConfigOptions, ZovaViteConfigResult } from 'zova-vite';

export interface ConfigContext {
  configMeta?: ZovaConfigMeta;
  configOptions?: ZovaViteConfigOptions;
  zovaViteMeta?: ZovaViteConfigResult;
}
