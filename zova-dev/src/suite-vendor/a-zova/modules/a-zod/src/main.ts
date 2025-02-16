import type { IModuleMain } from 'zova';
import { BeanSimple } from 'zova';
import { errorsAdapter } from './lib/zod/errorsAdapter.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    errorsAdapter(this.app);
  }

  async configLoaded(_config: any) {}
}
