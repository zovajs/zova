import { App, markRaw } from 'vue';
import { BeanContainer, BeanContainerLike } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginCabloyOptions } from '../../types/interface/pluginCabloy.js';
import { CabloyConfig, configDefault } from './config.js';
import { CabloyConstant, constantDefault } from './constant.js';
import { PluginBean } from '../../plugins/bean.js';
import { IModuleLocaleText } from '../../bean/resource/locale/type.js';

export class CabloyApplication {
  vue: App;
  bean: BeanContainerLike;
  meta: AppMeta;
  config: CabloyConfig;
  constant: CabloyConstant;
  $text: IModuleLocaleText;

  constructor(vue: App) {
    markRaw(this);
    vue.cabloy = this;
    this.vue = vue;
    this.bean = BeanContainer.create(this, null);
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    this.$text = this.meta.locale.createLocaleText();
  }

  /** @internal */
  public async initialize({ modulesMeta, Monkey, locales, config }: PluginCabloyOptions) {
    // monkey
    await this.meta.initialize(Monkey);
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // config
    this.config = this.meta.util.extend({}, configDefault, config);
    // constant
    this.constant = constantDefault;
    // plugins
    await this.handlePlugins();
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize');
    // monkey: appInitialized
    await this.meta.module._monkeyModule('appInitialized');
    // monkey: routerGuards
    await this.meta.module._monkeyModule('routerGuards', undefined);
  }

  private async handlePlugins() {
    // bean
    this.vue.use(PluginBean);
  }
}

declare module 'vue' {
  export interface App {
    /** @internal */
    cabloy: CabloyApplication;
  }
}
