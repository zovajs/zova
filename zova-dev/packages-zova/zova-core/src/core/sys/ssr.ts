import { BeanSimple } from '../../bean/beanSimple.ts';

export class SysSsr extends BeanSimple {
  /** @internal */
  public async initialize() {}

  /** @internal */
  public dispose() {}

  ignoreCookieOnServer() {
    return process.env.SERVER && !this.sys.config.ssr.cookie;
  }
}
