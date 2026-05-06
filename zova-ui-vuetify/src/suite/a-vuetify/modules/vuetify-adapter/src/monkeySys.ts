import type { IMonkeySysInitialize } from 'zova';

import { BeanSimple, deepExtend } from 'zova';

import { __ThisModule__ } from './.metadata/this.js';
import { SysAppBar } from './bean/sys.appBar.jsx';
import { SysIcon } from './bean/sys.icon.js';
import { SysMain } from './bean/sys.main.js';
import { SysNavigationDrawer } from './bean/sys.navigationDrawer.jsx';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'vuetify-adapter:themeHandler';
    }
    // icon
    const sysIcon = await this.bean._newBean(SysIcon, false);
    await sysIcon.initialize();
    // main
    const sysMain = await this.bean._newBean(SysMain, false);
    await sysMain.initialize();
    // navigationDrawer
    const sysNavigationDrawer = await this.bean._newBean(SysNavigationDrawer, false);
    await sysNavigationDrawer.initialize();
    // appBar
    const sysAppBar = await this.bean._newBean(SysAppBar, false);
    await sysAppBar.initialize();
    // config
    const configSelf = this.sys.util.getModuleConfigSafe(__ThisModule__);
    const configOpenapi = this.sys.util.getModuleConfigSafe('a-openapi');
    configOpenapi.resourceProviders = deepExtend({}, configOpenapi.resourceProviders, configSelf.resourceProviders);
  }
}
