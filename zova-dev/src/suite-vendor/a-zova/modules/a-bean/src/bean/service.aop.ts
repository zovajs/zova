import { evaluate } from '@cabloy/utils';
import { appResource, BeanBase, cast, Constructable, deepExtend, IBeanRecord, SymbolProxyDisable, Use } from 'zova';
import { Service } from '../lib/bean.js';
import { BeanOnion } from './bean.onion.js';
import { IAopRecord, IDecoratorAopOptions } from '../types/aop.js';
import { swapDeps } from '@cabloy/deps';

interface IAopMatchResult {
  name: keyof IAopRecord;
  beanFullName: string;
  options: IDecoratorAopOptions;
}

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  @Use()
  $$beanOnion: BeanOnion;

  async findAopsMatched<T>(A: Constructable<T>): Promise<string[] | undefined>;
  async findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): Promise<string[] | undefined>;
  async findAopsMatched(beanFullName: string): Promise<string[] | undefined>;
  async findAopsMatched<T>(beanFullName: Constructable<T> | string): Promise<string[] | undefined> {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    // beanFullName
    beanFullName = beanOptions.beanFullName;
    // collect
    const { moduleNames, aopsMatched } = this._collectModulesMatched(beanFullName);
    // load modules
    await this.app.meta.module.loadModules(Set.unique(moduleNames));
    // ok
    return aopsMatched;
  }
}
