import type { IMonkeySysInitialize } from 'zova';

import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    const configSelf = this.sys.util.getModuleConfigSafe('basic-adapter');
    const configOpenapi = this.sys.util.getModuleConfigSafe('a-openapi');
    configOpenapi.resourceProviders = deepExtend({}, configOpenapi.resourceProviders, configSelf.resourceProviders);
  }
}
