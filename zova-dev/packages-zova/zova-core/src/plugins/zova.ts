import type { App } from 'vue';
import type { ZovaContext } from '../core/index.js';
import type { PluginZovaOptions } from '../types/interface/pluginZova.js';
import { SymbolBeanContainerInstances } from '../bean/beanContainer.js';
import { BeanControllerIdentifier, BeanRenderIdentifier, BeanStyleIdentifier } from '../bean/type.js';
import { ZovaApplication } from '../core/index.js';
import { cast } from '../types/index.js';

export const PluginZova = {
  async install(
    vue: App,
    ctxRoot: ZovaContext,
    { modulesMeta, locales, config, AppMonkey, legacyRoutes }: PluginZovaOptions,
  ) {
    // zova app
    const app = new ZovaApplication(vue, ctxRoot);
    await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
    return app;
  },
  async update(app: ZovaApplication, ctxRoot: ZovaContext) {
    const bean = cast(app.bean);
    bean.ctx = ctxRoot;
    for (const key in bean[SymbolBeanContainerInstances]) {
      bean[SymbolBeanContainerInstances][key].ctx = ctxRoot;
    }
    delete bean[SymbolBeanContainerInstances][BeanControllerIdentifier];
    delete bean[SymbolBeanContainerInstances][BeanRenderIdentifier];
    delete bean[SymbolBeanContainerInstances][BeanStyleIdentifier];
    Object.assign(bean[SymbolBeanContainerInstances], ctxRoot.bean[SymbolBeanContainerInstances]);
    ctxRoot.bean = bean;
    ctxRoot.app = app;
  },
};
