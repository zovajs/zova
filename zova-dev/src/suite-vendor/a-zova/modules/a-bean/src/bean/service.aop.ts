import { appResource, BeanBase, Constructable, IBeanRecord, SymbolProxyDisable } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  async findAopsMatched<T>(A: Constructable<T>): Promise<string[] | undefined>;
  async findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): Promise<string[] | undefined>;
  async findAopsMatched(beanFullName: string): Promise<string[] | undefined>;
  async findAopsMatched<T>(beanFullName: Constructable<T> | string): Promise<string[] | undefined> {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    // beanFullName
    beanFullName = beanOptions.beanFullName;
    //

    return;
  }

  _collectModulesMatched(beanFullName: string) {
    const moduleNames: string[] = [];
    for (const moduleName in this.app.meta.module.modulesMeta.modules) {
      const module = this.app.meta.module.modulesMeta.modules[moduleName];
    }
  }
}
