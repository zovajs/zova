import { getOnionScenesMeta, OnionSceneMeta } from '@cabloy/module-info';
import { BeanBase, cast, SymbolProxyDisable } from 'zova';
import { Service } from '../lib/bean.js';
import {
  IOnionExecuteCustom,
  IOnionOptionsDeps,
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionSlice,
} from '../types/onion.js';
import { BeanOnion } from './bean.onion.js';
import { ISwapDepsItem, swapDeps } from '@cabloy/deps';

const SymbolOnionsEnabled = Symbol('SymbolOnionsEnabled');
const SymbolOnionsEnabledWrapped = Symbol('SymbolOnionsEnabledWrapped');

@Service()
export class ServiceOnion<OPTIONS, ONIONNAME extends string> extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;
  private beanOnion: BeanOnion;
  sceneName: string;
  sceneMeta: OnionSceneMeta;
  onionsNormal: Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
  onionsGlobal: IOnionSlice<OPTIONS, ONIONNAME>[];

  private [SymbolOnionsEnabled]: Record<string, IOnionSlice<OPTIONS, ONIONNAME>[]> = {};
  private [SymbolOnionsEnabledWrapped]: Record<string, Function[]> = {};

  _cacheOnionsGlobal: Function[];
  _cacheOnionsHandler: Record<string, Function[]> = {};

  protected __init__(sceneName: string, beanOnion: BeanOnion) {
    this.beanOnion = beanOnion;
    this.sceneName = sceneName;
    this.sceneMeta = getOnionScenesMeta(this.app.meta.module.modulesMeta.modules)[this.sceneName];
    this._loadOnions();
    this._handleDependents(this.onionsGlobal);
    this._swapOnions(this.onionsGlobal);
  }

  getOnionsEnabled(selector?: string) {
    if (!selector) selector = '';
    if (!this[SymbolOnionsEnabled][selector]) {
      this[SymbolOnionsEnabled][selector] = this.onionsGlobal.filter(onionSlice => {
        const onionOptions = onionSlice.beanOptions.options as IOnionOptionsEnable & IOnionOptionsMatch<string>;
        return this.beanOnion.checkOnionOptionsEnabled(onionOptions, selector);
      }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
    }
    return this[SymbolOnionsEnabled][selector];
  }

  getOnionsEnabledOfMeta(beanName: string, selector?: string) {
    return this.getOnionsEnabled(selector).filter(item => item.beanOptions.name === beanName);
  }

  getOnionsEnabledWrapped(wrapFn: Function, selector?: string) {
    if (!selector) selector = '';
    if (!this[SymbolOnionsEnabledWrapped][selector]) {
      const onions = this.getOnionsEnabled(selector);
      this[SymbolOnionsEnabledWrapped][selector] = onions.map(item => {
        return wrapFn(item);
      });
    }
    return this[SymbolOnionsEnabledWrapped][selector];
  }

  public get composedOnionsGlobal() {
    return this._composeOnionsGlobal();
  }

  private _composeOnionsGlobal(executeCustom?: IOnionExecuteCustom) {
    if (!this._cacheOnionsGlobal) {
      const onions: Function[] = [];
      for (const item of this.onionsGlobal) {
        onions.push(this._wrapOnion(item, executeCustom));
      }
      this._cacheOnionsGlobal = onions;
    }
    return this._cacheOnionsGlobal;
  }

  getOnionSlice(onionName: ONIONNAME): IOnionSlice<OPTIONS, ONIONNAME> {
    return this.onionsNormal[onionName];
  }

  getOnionOptions<OPTIONS>(onionName: ONIONNAME): OPTIONS | undefined {
    return this.getOnionSlice(onionName).beanOptions.options as OPTIONS | undefined;
  }

  private _handleDependents(onions: IOnionSlice<OPTIONS, ONIONNAME>[]) {
    for (const onion of onions) {
      const onionOptions = onion.beanOptions.options as IOnionOptionsDeps<string>;
      let dependents = onionOptions.dependents as any;
      if (!dependents) continue;
      if (!Array.isArray(dependents)) {
        dependents = dependents.split(',') as any[];
      }
      for (const dep of dependents!) {
        const onion2 = onions.find(item => item.name === dep);
        if (!onion2) {
          throw new Error(`${this.sceneName} ${dep} not found for dependents of ${onion.name}`);
        }
        const options = onion2.beanOptions.options as IOnionOptionsDeps<string>;
        if (!options.dependencies) options.dependencies = [];
        if (!Array.isArray(options.dependencies)) {
          options.dependencies = [options.dependencies] as never[];
        }
        if (options.dependencies.findIndex(item => item === onion.name) === -1) {
          options.dependencies.push(onion.name as never);
        }
      }
    }
  }

  private _swapOnions(onions: IOnionSlice<OPTIONS, ONIONNAME>[]) {
    swapDeps(onions as ISwapDepsItem[], {
      name: 'name',
      dependencies: item => {
        const onionOptions = cast<IOnionSlice<OPTIONS, ONIONNAME>>(item).beanOptions
          .options as IOnionOptionsDeps<string>;
        return onionOptions.dependencies as any;
      },
    });
  }

  private _loadOnions() {
    const onionsAll = this._loadOnionsAll();
    this.onionsNormal = {} as Record<ONIONNAME, IOnionSlice<OPTIONS, ONIONNAME>>;
    this.onionsGlobal = [];
    // load
    for (const item of onionsAll) {
      // normal
      this.onionsNormal[item.name] = item;
      // global
      if (!this.sceneMeta.hasLocal || cast(item.beanOptions.options)?.global) {
        this.onionsGlobal.push(item);
      }
    }
  }

  private _loadOnionsAll() {
    const onionsAll: IOnionSlice<OPTIONS, ONIONNAME>[] = [];
    for (const module of this.app.meta.modulesArray) {
      this._loadOnionsAll_fromMetadata(onionsAll, module);
    }
    return onionsAll;
  }

  private _loadOnionsAll_fromMetadata(onionsAll: IOnionSlice<OPTIONS, ONIONNAME>[], module: IModule) {
    const onions = appResource.scenes[this.sceneName]?.[module.info.relativeName];
    if (!onions) return;
    for (const key in onions) {
      const beanOptions = onions[key];
      const name = key.replace(`.${this.sceneName}.`, ':') as ONIONNAME;
      // options
      const optionsConfig = this.app.config.onions[beanOptions.scene]?.[name];
      if (beanOptions.optionsPrimitive) {
        beanOptions.options = optionsConfig === undefined ? beanOptions.options : optionsConfig;
      } else {
        beanOptions.options = deepExtend({}, beanOptions.options, optionsConfig);
      }
      // push
      // todo: remove options/as any
      onionsAll.push({
        name,
        options: beanOptions.options as any,
        beanOptions: beanOptions as any,
      } as any);
    }
  }

  /** internal */
  public _wrapOnion(item: IOnionSlice<OPTIONS, ONIONNAME>, executeCustom?: IOnionExecuteCustom) {
    const sceneName = this.sceneName;
    const fn = (data: any, next: Next) => {
      // optionsPrimitive
      const optionsPrimitive = item.beanOptions.optionsPrimitive;
      // options
      const options = this.combineOnionOptions(item);
      // enable match ignore dependencies
      if (!optionsPrimitive && !this.bean.onion.checkOnionOptionsEnabled(options, this._getRoutePathForMatch())) {
        return next(data);
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`${sceneName} bean not found: ${beanFullName}`);
      }
      if (executeCustom) {
        return executeCustom(beanInstance, data, options, next);
      }
      return cast(beanInstance).execute(options, next);
    };
    fn._name = item.name;
    return fn;
  }

  private _getRoutePathForMatch() {
    const routePathRaw: string | undefined = this.ctx.route?.routePathRaw;
    if (!routePathRaw) return;
    return routePathRaw.startsWith('//')
      ? '/' + this.ctx.path
      : this.ctx.path.substring(this.app.config.globalPrefix.length);
  }
}
