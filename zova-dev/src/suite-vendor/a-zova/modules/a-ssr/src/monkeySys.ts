import type { IMonkeySysContextInitialize, ZovaContext } from 'zova';
import { BeanSimple } from 'zova';
import { CtxSSR } from './lib/ssr.js';

export class MonkeySys extends BeanSimple implements IMonkeySysContextInitialize {
  sysContextInitialize(ctx: ZovaContext): void {
    ctx.meta.ssr = ctx.bean._newBeanSimple(CtxSSR, false);
    ctx.meta.ssr.initialize();
  }
}
