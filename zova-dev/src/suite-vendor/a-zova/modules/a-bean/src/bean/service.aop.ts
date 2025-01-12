import { evaluate } from '@cabloy/utils';
import { appResource, BeanBase, Constructable, deepExtend, IBeanRecord, SymbolProxyDisable, Use } from 'zova';
import { BeanOnion, Service } from 'zova-module-a-bean';

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  @Use()
  beanOnion: BeanOnion;

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
    await this.app.meta.module.loadModules(moduleNames);
    // ok
    return aopsMatched;
  }

  _collectModulesMatched(beanFullName: string) {
    const moduleNames: string[] = [];
    const aopsMatched: string[] = [];
    for (const moduleName in this.app.meta.module.modulesMeta.modules) {
      const module = this.app.meta.module.modulesMeta.modules[moduleName];
      const aops = module.info.capabilities?.aops;
      if (!aops) continue;
      for (const aopName in aops) {
        const aopOptions = aops[aopName];
        for (const key of ['match', 'ignore']) {
          // value
          let value = aopOptions[key];
          if (Array.isArray(value)) {
            value = value.map(item => (typeof item === 'string' && item.startsWith('/') ? evaluate(item) : item));
          } else {
            value = typeof value === 'string' && value.startsWith('/') ? evaluate(value) : value;
          }
          aopOptions[key] = value;
          // extend config
          const onionName = `${moduleName}:${aopName}`;
          const optionsConfig = this.app.config.onions['aop']?.[onionName];
          if (optionsConfig) {
            value = deepExtend({}, value, optionsConfig);
          }
          // check
          if (this.beanOnion.checkOnionOptionsEnabled(value, beanFullName)) {
            moduleNames.push(moduleName);
            aopsMatched.push(`${moduleName}.aop:${aopName}`);
          }
        }
      }
    }
    return { moduleNames, aopsMatched };
  }
}
