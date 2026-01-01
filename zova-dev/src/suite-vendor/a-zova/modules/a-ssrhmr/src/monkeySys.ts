import type { IMonkeySysReady } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysReady {
  async sysReady(): Promise<void> {
    if (this.sys.env.SSR_HMR !== 'true') return;
    console.log('-----------ssr hmr', new Date());
  }
}
