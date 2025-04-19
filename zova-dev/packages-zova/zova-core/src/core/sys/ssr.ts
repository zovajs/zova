import { BeanSimple } from '../../bean/beanSimple.js';

export class SysSSR extends BeanSimple {
  public async getSsrHandler() {
    const ssrHandler = await this.sys.bean._getBean('a-ssrserver.service.ssrHandler' as never, false) as any;
    return ssrHandler;
  }
}
