import type { IMonkeySysInitialize } from 'zova';

import { BeanSimple, deepExtend } from 'zova';

import { __ThisModule__ } from './.metadata/this.js';
import { SysIcon } from './bean/sys.icon.js';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'quasar-adapter:themeHandler';
    }
    // icon
    const sysIcon = await this.bean._newBean(SysIcon, false);
    await sysIcon.initialize();
    // config
    const configSelf = this.sys.util.getModuleConfigSafe(__ThisModule__);
    const configOpenapi = this.sys.util.getModuleConfigSafe('a-openapi');
    configOpenapi.formProvider = deepExtend(
      {},
      configOpenapi.formProvider,
      configSelf.formProvider,
    );
  }
}
