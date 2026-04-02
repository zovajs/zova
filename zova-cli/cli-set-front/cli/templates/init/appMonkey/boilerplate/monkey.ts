import type { IModule } from '@cabloy/module-info';
import type { IMonkeyAppClose, IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyModule } from 'zova';

import { BeanSimple } from 'zova';

export class AppMonkey extends BeanSimple implements IMonkeyModule, IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyAppClose {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config: any) {}
  async appStart() {}
  async appReady() {}
  async appStarted() {}
  async appClose() {}
  async appClosed() {}
}
