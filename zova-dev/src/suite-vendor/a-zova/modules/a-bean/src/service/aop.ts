import type { Constructable, IBeanRecord } from 'zova';
import type { BeanOnion } from '../bean/bean.onion.js';
import type { IAopRecord, IDecoratorAopOptions } from '../types/aop.js';
import type { IOnionSlice } from '../types/onion.js';
import { appResource, BeanBase, SymbolProxyDisable, Use } from 'zova';
import { Service } from '../lib/bean.js';

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
}
