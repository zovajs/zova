import type { IMonkeyAppContextInitialize, ZovaContext } from 'zova';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyAppContextInitialize {
  appContextInitialize(ctx: ZovaContext): void {
    ctx.meta.$ssr = ctx.app.ctx.meta.$ssr;
  }
}
