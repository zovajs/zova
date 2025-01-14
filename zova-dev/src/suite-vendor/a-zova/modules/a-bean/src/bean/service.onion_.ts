import { appResource, BeanSimple, deepExtend, Next, SymbolProxyDisable } from 'zova';
import { compose as _compose } from '@cabloy/compose';
import {
  IOnionExecuteCustom,
  IOnionItem,
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionSlice,
} from '../types/onion.js';
import { BeanOnion } from './bean.onion.js';

// const SymbolOnionsEnabled = Symbol('SymbolOnionsEnabled');
// const SymbolOnionsEnabledWrapped = Symbol('SymbolOnionsEnabledWrapped');

export class ServiceOnion<OPTIONS, ONIONNAME extends string> extends BeanSimple {
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

  async loadOnions(onionItems: IOnionItem<OPTIONS, ONIONNAME> | IOnionItem<OPTIONS, ONIONNAME>[], selector?: string) {
    if (!Array.isArray(onionItems)) onionItems = [onionItems];
    // load modules
    const moduleNames = onionItems.map(item => item.name.split(':')[0]);
    await this._loadModulesAndOptions(moduleNames);
    // onion slices
    const onionSlices: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
    for (const item of onionItems) {
      const beanFullName = item.name.replace(':', `.${this.sceneName}.`);
      const beanOptions = appResource.getBean(beanFullName);
      onionSlices.push({ name: item.name, beanOptions: beanOptions as any });
    }
    // filter
    return this.getOnionsEnabled(onionSlices, selector);
  }

  getOnionsEnabled(onions: IOnionSlice<OPTIONS, ONIONNAME>[], selector?: string) {
    if (!selector) selector = '';
    return onions.filter(onionSlice => {
      const onionOptions = onionSlice.beanOptions.options as IOnionOptionsEnable & IOnionOptionsMatch<string>;
      return this.beanOnion.checkOnionOptionsEnabled(onionOptions, selector);
    }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
  }

  compose(onions: IOnionSlice<OPTIONS, ONIONNAME>[], executeCustom: IOnionExecuteCustom<OPTIONS, ONIONNAME>) {
    // fns
    const fns: Function[] = [];
    for (const item of onions) {
      fns.push(this._wrapOnion(item, executeCustom));
    }
    // compose
    return _compose(onions);
  }

  async _loadModulesAndOptions(moduleNames: string[]) {
    // load modules
    moduleNames = Set.unique(moduleNames).filter(item => !!this.app.meta.module.get(item, false));
    await this.app.meta.module.loadModules(moduleNames);
    // load options
    for (const moduleName of moduleNames) {
      this._loadOnionsOptions(moduleName);
    }
  }

  _loadOnionsOptions(moduleName: string) {
    const onions = appResource.scenes[this.sceneName]?.[moduleName];
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

  /** internal */
  public _wrapOnion(item: IOnionSlice<OPTIONS, ONIONNAME>, executeCustom: IOnionExecuteCustom<OPTIONS, ONIONNAME>) {
    const fn = (data: any, next: Next) => {
      return executeCustom(item, data, next);
    };
    fn._name = item.name;
    return fn;
  }
}
