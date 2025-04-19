import { BeanSimple } from '../../bean/beanSimple.js';

export class SysSSR extends BeanSimple {
  public async resolveRoute(url: string, check404?: boolean, checkAliasOf?: boolean): Promise<any | undefined> {
    const sysRouter = await this.sys.bean._getBean('a-router.sys.router' as never, false) as any;
    return await sysRouter.resolveRoute(url, check404, checkAliasOf);
  }
}
