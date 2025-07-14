import type { IDecoratorBeanOptionsBase } from '../decorator/interface/beanOptions.js';
import { appResource } from '../core/sys/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');
export const SymbolModuleName = Symbol('SymbolModuleName');
export const SymbolInited = Symbol('SymbolInited');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;
  // @ts-ignore: ignore
  private [SymbolInited]: StateLock;

  constructor() {
    super();
    this[SymbolInited] = StateLock.create();
  }

  protected get [SymbolModuleBelong]() {
    const moduleBelong = appResource._getModuleBelong(this[SymbolBeanFullName]);
    if (!moduleBelong) throw new Error(`not found module belong: ${this[SymbolBeanFullName]}`);
    return moduleBelong;
  }

  protected get [SymbolModuleName]() {
    const moduleName = appResource._getModuleName(this[SymbolBeanFullName]);
    if (!moduleName) throw new Error(`not found module name: ${this[SymbolBeanFullName]}`);
    return moduleName;
  }

  public get $beanFullName() {
    return this[SymbolBeanFullName];
  }

  protected get $beanOptions(): IDecoratorBeanOptionsBase {
    return appResource.getBean(this[SymbolBeanFullName])!;
  }

  public get $onionName() {
    const parts = this.$beanFullName.split('.');
    return `${parts[0]}:${parts[2]}`;
  }

  protected get $onionOptions(): unknown | undefined {
    return this.$beanOptions.options;
  }
}
