import type { IModule } from '@cabloy/module-info';
import type { IMonkeyModule, IMonkeySysClose, IMonkeySysInitialize, IMonkeySysInitialized, IMonkeySysReady } from 'zova';

import { BeanSimple } from 'zova';

export class SysMonkey extends BeanSimple implements IMonkeyModule, IMonkeySysInitialize, IMonkeySysInitialized, IMonkeySysReady, IMonkeySysClose {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config: any) {}
  async sysInitialize() {}
  async sysInitialized() {}
  async sysReady() {}
  async sysClose() {}
}
