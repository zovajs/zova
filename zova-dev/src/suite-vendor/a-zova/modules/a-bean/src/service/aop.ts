import type { BeanAopMethodBase, Constructable, IBeanRecord } from 'zova';
import type { IAopRecord, IDecoratorAopOptions } from '../types/aop.js';
import type { IOnionItem, IOnionSlice } from '../types/onion.js';
import { appMetadata, appResource, BeanBase, SymbolProxyDisable, Use } from 'zova';
import { BeanOnion } from '../bean/bean.onion.js';
import { Service } from '../lib/bean.js';
import { IAopMethodRecord, IDecoratorAopMethodOptions, IUseAopMethodPropMetadata, SymbolDecoratorUseAopMethod } from '../types/aopMethod.js';

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  @Use()
  $$beanOnion: BeanOnion;

  async findAopsMatched<T>(
    A: Constructable<T>,
  ): Promise<IOnionSlice<IDecoratorAopOptions, keyof IAopRecord>[] | undefined>;
  async findAopsMatched<K extends keyof IBeanRecord>(
    beanFullName: K,
  ): Promise<IOnionSlice<IDecoratorAopOptions, keyof IAopRecord>[] | undefined>;
  async findAopsMatched(
    beanFullName: string,
  ): Promise<IOnionSlice<IDecoratorAopOptions, keyof IAopRecord>[] | undefined>;
  async findAopsMatched<T>(
    beanFullName: Constructable<T> | string,
  ): Promise<IOnionSlice<IDecoratorAopOptions, keyof IAopRecord>[] | undefined> {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    // loadOnions
    return await this.$$beanOnion.aop.loadOnionsFromPackage(beanOptions.beanFullName);
  }

  async hasAopMethods<T>(A: Constructable<T>): Promise<boolean>;
  async hasAopMethods<K extends keyof IBeanRecord>(beanFullName: K): Promise<boolean>;
  async hasAopMethods(beanFullName: string): Promise<boolean>;
  async hasAopMethods<T>(beanFullName: Constructable<T> | string): Promise<boolean> {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return false;
    const uses = appMetadata.getMetadata<Record<string, IUseAopMethodPropMetadata[]>>(
      SymbolDecoratorUseAopMethod,
      beanOptions.beanClass.prototype,
    );

    if (uses) {
      const onionItems: IOnionItem<IDecoratorAopMethodOptions, keyof IAopMethodRecord>[] = [];
      for (const prop in uses) {
        const aopMethods: IUseAopMethodPropMetadata[] = uses[prop];
        for (const aopMethod of aopMethods) {
          onionItems.push({
            name: aopMethod.onionName,
            options: aopMethod.options,
          });
        }
      }
      // load onions
      const onionSlices = await this.$$beanOnion.aopMethod.loadOnions<BeanAopMethodBase>(onionItems);
      for (const onionSlice of onionSlices) {
        await this.app.bean._getBean(onionSlice.beanFullName as any, true);
      }
    }
    return !!uses;
  }

  findAopMethodsMatched<T>(A: Constructable<T>, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched<K extends keyof IBeanRecord>(beanFullName: K, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched(beanFullName: string, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched<T>(beanFullName: Constructable<T> | string, prop: string): IUseAopMethodPropMetadata[] | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    const aopMethodsMatched: IUseAopMethodPropMetadata[] = [];
    const uses = appMetadata.getMetadata<Record<string, IUseAopMethodPropMetadata[]>>(
      SymbolDecoratorUseAopMethod,
      beanOptions.beanClass.prototype,
    );
    const aopMethods: IUseAopMethodPropMetadata[] | undefined = uses?.[prop];
    if (aopMethods) {
      const onionItems: IOnionItem<IDecoratorAopMethodOptions, keyof IAopMethodRecord>[] = [];
      for (const aopMethod of aopMethods) {
        onionItems.push({
          name: aopMethod.onionName,
          options: aopMethod.options,
        });
        // load onions
        const onionSlices = await this.$$beanOnion.aopMethod.loadOnions<BeanAopMethodBase>(onionItems);
        const onionSlice = this.bean.onion.aopMethod.getOnionSlice(aopMethod.onionName!);
        const options = deepExtend({}, onionSlice.beanOptions.options, aopMethod.options);
        if (this.bean.onion.checkOnionOptionsEnabled(options)) {
          const beanFullName = beanFullNameFromOnionName(aopMethod.onionName!, 'aopMethod');
          const beanInstance = this.app.bean._getBean(beanFullName as any);
          aopMethodsMatched.push({
            onionName: aopMethod.onionName,
            beanInstance,
            options,
          });
        }
      }
    }
    return aopMethodsMatched;
  }
}
