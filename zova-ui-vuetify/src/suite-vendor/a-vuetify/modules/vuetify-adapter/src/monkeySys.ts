import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';
import { VTextField } from 'vuetify/components';
import { BeanSimple, deepExtend } from 'zova';
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
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {},
      },
      form: {
        provider: {
          components: {
            text: VTextField,
            captcha: 'vuetify-form:formFieldCaptcha',
          },
          behaviors: {
            formField: 'vuetify-form:formField',
            formFieldLayout: 'vuetify-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {},
          actions: {},
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.resourceMeta = deepExtend(
      {},
      scopeRestConfig.base,
      configCustom,
      scopeRestConfig.resourceMeta,
    );
  }
}
