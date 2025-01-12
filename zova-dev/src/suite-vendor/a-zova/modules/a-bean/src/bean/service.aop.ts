import { appResource, BeanBase, Constructable, IBeanRecord, SymbolProxyDisable } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  findAopsMatched<T>(A: Constructable<T>): string[] | undefined;
  findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): string[] | undefined;
  findAopsMatched(beanFullName: string): string[] | undefined;
  findAopsMatched<T>(beanFullName: Constructable<T> | string): string[] | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    return;
  }
}
