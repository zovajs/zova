import { appResource } from '../core/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');
export const SymbolModuleName = Symbol('SymbolModuleName');
export const SymbolInited = Symbol('SymbolInited');

export class BeanBaseSimple extends BeanSimple {
  protected [SymbolBeanFullName]: string;
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
}
