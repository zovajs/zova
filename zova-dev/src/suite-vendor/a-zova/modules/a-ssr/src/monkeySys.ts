import type { IMonkeySysContextInitialize, ZovaContext } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysContextInitialize {
  sysContextInitialize(ctx: ZovaContext): void {
  }
}
