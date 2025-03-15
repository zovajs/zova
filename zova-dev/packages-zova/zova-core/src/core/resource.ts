import type { IBeanRecord } from '../bean/type.js';
import type {
  Constructable,
  Functionable,
  IBeanSceneRecord,
  IDecoratorBeanInfoOptions,
  IDecoratorBeanOptionsBase,
  IDecoratorUseOptionsBase,
} from '../decorator/index.js';
import type { MetadataKey } from './metadata.js';
import { parseLastWord, skipLastWord, skipPrefix, splitWords } from '@cabloy/word-utils';
import { BeanSimple } from '../bean/beanSimple.js';
import { registerMappedClassMetadataKey } from '../mappedClass/utils.js';
import { isClass } from '../utils/isClass.js';
import { uuid } from '../utils/uuid.js';
import { appMetadata } from './metadata.js';

export const DecoratorBeanFullName = Symbol('Decorator#BeanFullName');
export const SymbolDecoratorBeanInfo = Symbol('SymbolDecoratorBeanInfo');
export const SymbolDecoratorUse = Symbol('SymbolDecoratorUse');
export const DecoratorBeanFullNameOfComposable = Symbol('Decorator#BeanFullNameOfComposable');

export type IAppResourceRecord = Record<string, IDecoratorBeanOptionsBase>;

export class AppResource extends BeanSimple {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};
  scenes: Record<string, Record<string, IAppResourceRecord>> = {};

  addUse(target: object, options: IDecoratorUseOptionsBase) {
    registerMappedClassMetadataKey(target, SymbolDecoratorUse);
    const uses = appMetadata.getOwnMetadataMap(true, SymbolDecoratorUse, target);
    uses[options.prop] = options;
    if (process.env.NODE_ENV === 'development') {
      if (typeof options.prop === 'string' && !options.prop.startsWith('$$')) {
        console.error(`inject prop name should start with $$: ${options.prop}`);
      }
    }
  }

  getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase> | undefined {
    return appMetadata.getMetadata(SymbolDecoratorUse, target);
  }

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    const { beanClass, virtual } = options;
    // name
    const { scene, name } = this._parseSceneAndBeanName(beanClass!, options.scene, options.name);
    // beanInfo
    const beanInfo = appMetadata.getMetadata<IDecoratorBeanInfoOptions>(SymbolDecoratorBeanInfo, beanClass!);
    // module
    const module = beanInfo?.module;
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    // beanFullName
    const beanFullName = `${module}.${scene}.${name}`;
    // moduleBelong
    const moduleBelong = this._parseModuleBelong(module, beanClass, virtual);
    // options
    const beanOptions = {
      ...options,
      module,
      scene: scene as keyof IBeanSceneRecord,
      name,
      beanFullName,
      moduleBelong,
    } as IDecoratorBeanOptionsBase<T>;
    // record
    this.beans[beanFullName] = beanOptions;
    if (!this.scenes[scene!]) this.scenes[scene!] = {};
    if (!this.scenes[scene!][module]) this.scenes[scene!][module] = {};
    this.scenes[scene!][module][beanFullName] = beanOptions;
    // set metadata
    appMetadata.defineMetadata(DecoratorBeanFullName, beanFullName, beanOptions.beanClass);
    // ok
    return beanOptions;
  }

  getBeanFullName<T>(A: Constructable<T> | undefined): string | undefined;
  getBeanFullName<K extends keyof IBeanRecord>(beanFullName: K | undefined): K | undefined;
  getBeanFullName(beanFullName: string | undefined): string | undefined;
  getBeanFullName(beanFullName) {
    if (!beanFullName) return beanFullName;
    if (typeof beanFullName === 'function' && isClass(beanFullName)) {
      return appMetadata.getOwnMetadata(DecoratorBeanFullName, beanFullName);
    }
    return beanFullName;
  }

  getBeanFullNameOfComposable(beanComposable: Functionable | undefined): string | undefined {
    if (!beanComposable) return;
    if (!beanComposable[DecoratorBeanFullNameOfComposable]) {
      beanComposable[DecoratorBeanFullNameOfComposable] = `__composable__:${uuid()}`;
    }
    return beanComposable[DecoratorBeanFullNameOfComposable];
  }

  getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<K extends keyof IBeanRecord>(beanFullName: K): IDecoratorBeanOptionsBase<IBeanRecord[K]> | undefined;
  getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName): IDecoratorBeanOptionsBase<T> | undefined {
    const fullName = this.getBeanFullName(beanFullName);
    if (!fullName) return null!;
    return this.beans[fullName] as IDecoratorBeanOptionsBase<T>;
  }

  _fixClassName(className: string) {
    const ch = className.charAt(className.length - 1);
    if (ch === '2') return className.substring(0, className.length - 1);
    // if (ch >= '0' && ch <= '9') return className.substring(0, className.length - 1);
    return className;
  }

  _parseSceneAndBeanName<T>(
    beanClass: Constructable<T>,
    scene?: string,
    name?: string,
  ): { scene: string; name: string } {
    if (scene && name) {
      return { scene, name };
    }
    // bean class name
    let beanClassName = this._fixClassName(beanClass.name);
    // skip prefix: Bean
    if (beanClassName.toLowerCase().startsWith('bean')) {
      beanClassName = beanClassName.substring('bean'.length);
    }
    // name
    if (!name) {
      if (scene) {
        name = skipPrefix(beanClassName, scene, true)!;
      } else {
        name = parseLastWord(beanClassName, true)!;
      }
    }
    // scene
    if (!scene) {
      scene = skipLastWord(beanClassName, name, true)!;
      scene = splitWords(scene, true, '.')!;
    }
    // ok
    return { scene, name };
  }

  _parseModuleBelong(module, beanClass, virtual) {
    // not set when virtual
    if (virtual) return;
    // check parent
    let moduleBelong;
    let parent = Object.getPrototypeOf(beanClass);
    while (parent) {
      const beanOptions = this.getBean(parent);
      if (beanOptions && beanOptions.moduleBelong) {
        moduleBelong = beanOptions.moduleBelong;
        break;
      }
      parent = Object.getPrototypeOf(parent);
    }
    // set to current when parent not set
    if (!moduleBelong) {
      moduleBelong = module;
    }
    return moduleBelong;
  }

  _getModuleBelong<T>(A: Constructable<T>): string | undefined;
  _getModuleBelong<K extends keyof IBeanRecord>(beanFullName: K): string | undefined;
  _getModuleBelong(beanFullName: string): string | undefined;
  _getModuleBelong<T>(beanFullName: Constructable<T> | string): string | undefined {
    const beanOptions = this.getBean(beanFullName as any);
    return beanOptions?.moduleBelong;
  }

  _getModuleName<T>(A: Constructable<T>): string | undefined;
  _getModuleName<K extends keyof IBeanRecord>(beanFullName: K): string | undefined;
  _getModuleName(beanFullName: string): string | undefined;
  _getModuleName<T>(beanFullName: Constructable<T> | string): string | undefined {
    const beanOptions = this.getBean(beanFullName as any);
    return beanOptions?.module;
  }
}

export const appResource = new AppResource();
