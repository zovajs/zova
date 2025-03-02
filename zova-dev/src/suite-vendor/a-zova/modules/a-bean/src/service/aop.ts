import type { Constructable, IBeanRecord } from 'zova';
import type { IAopRecord, IDecoratorAopOptions } from '../types/aop.js';
import type { IOnionSlice } from '../types/onion.js';
import { appMetadata, appResource, BeanBase, SymbolProxyDisable, Use } from 'zova';
import { BeanOnion } from '../bean/bean.onion.js';
import { Service } from '../lib/bean.js';
import { SymbolDecoratorUseAopMethod } from '../types/aopMethod.js';

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
    const uses = appMetadata.getMetadata<IUseAopMethodPropMetadata<T>[]>(SymbolDecoratorUseAopMethod, beanOptions.beanClass.prototype);

    return !!uses;
  }
}
