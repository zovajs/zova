import { IModule } from '@cabloy/module-info';
import { appResource, BeanBase, deepExtend, SymbolProxyDisable } from 'zova';
import { Service } from '../lib/bean.js';
import { IOnionItem } from '../types/onion.js';
import { BeanOnion } from './bean.onion.js';

// const SymbolOnionsEnabled = Symbol('SymbolOnionsEnabled');
// const SymbolOnionsEnabledWrapped = Symbol('SymbolOnionsEnabledWrapped');

@Service()
export class ServiceOnion<OPTIONS, ONIONNAME extends string> extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;
  protected beanOnion: BeanOnion;
  sceneName: string;

  // private [SymbolOnionsEnabled]: Record<string, IOnionSlice<OPTIONS, ONIONNAME>[]> = {};
  // private [SymbolOnionsEnabledWrapped]: Record<string, Function[]> = {};

  protected __init__(sceneName: string, beanOnion: BeanOnion) {
    this.beanOnion = beanOnion;
    this.sceneName = sceneName;
  }

  // getOnionsEnabled(selector?: string) {
  //   if (!selector) selector = '';
  //   if (!this[SymbolOnionsEnabled][selector]) {
  //     this[SymbolOnionsEnabled][selector] = this.onionsGlobal.filter(onionSlice => {
  //       const onionOptions = onionSlice.beanOptions.options as IOnionOptionsEnable & IOnionOptionsMatch<string>;
  //       return this.beanOnion.checkOnionOptionsEnabled(onionOptions, selector);
  //     }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
  //   }
  //   return this[SymbolOnionsEnabled][selector];
  // }

  // getOnionsEnabledOfMeta(beanName: string, selector?: string) {
  //   return this.getOnionsEnabled(selector).filter(item => item.beanOptions.name === beanName);
  // }

  // getOnionsEnabledWrapped(wrapFn: Function, selector?: string) {
  //   if (!selector) selector = '';
  //   if (!this[SymbolOnionsEnabledWrapped][selector]) {
  //     const onions = this.getOnionsEnabled(selector);
  //     this[SymbolOnionsEnabledWrapped][selector] = onions.map(item => {
  //       return wrapFn(item);
  //     });
  //   }
  //   return this[SymbolOnionsEnabledWrapped][selector];
  // }

  // getOnionSlice(onionName: ONIONNAME): IOnionSlice<OPTIONS, ONIONNAME> {
  //   return this.onionsNormal[onionName];
  // }

  // getOnionOptions<OPTIONS>(onionName: ONIONNAME): OPTIONS | undefined {
  //   return this.getOnionSlice(onionName).beanOptions.options as OPTIONS | undefined;
  // }

  async loadOnions(onionItems: IOnionItem<OPTIONS, ONIONNAME> | IOnionItem<OPTIONS, ONIONNAME>[]) {
    if (!Array.isArray(onionItems)) onionItems = [onionItems];
    // load modules
    const moduleNames = Set.unique(
      onionItems.map(item => item.name.split(':')[0]).filter(item => !!this.app.meta.module.get(item, false)),
    );
    await this.app.meta.module.loadModules(moduleNames);
    // load options
    for (const moduleName of moduleNames) {
      const module = this.app.meta.module.modulesMeta.modules[moduleName];
      this._loadOnionsOptions(module);
    }
  }

  _loadOnionsOptions(module: IModule) {
    const onions = appResource.scenes[this.sceneName]?.[module.info.relativeName];
    if (!onions) return;
    for (const key in onions) {
      const beanOptions = onions[key];
      const name = key.replace(`.${this.sceneName}.`, ':') as ONIONNAME;
      // options
      const optionsConfig = this.app.config.onions[this.sceneName]?.[name];
      if (beanOptions.optionsPrimitive) {
        beanOptions.options = optionsConfig === undefined ? beanOptions.options : optionsConfig;
      } else {
        beanOptions.options = deepExtend({}, beanOptions.options, optionsConfig);
      }
    }
  }
}
