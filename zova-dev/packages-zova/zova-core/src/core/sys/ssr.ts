import { BeanSimple } from '../../bean/beanSimple.js';

export class SysSSR extends BeanSimple {
  public async getSsrHandler(siteAssetDir: string) {
    const ssrHandler = await this.sys.bean._getBean('a-ssrserver.service.ssrHandler' as never, false, siteAssetDir) as any;
    return ssrHandler;
  }
}
