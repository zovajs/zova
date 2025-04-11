import type { IBeanRecord, OmitNever } from 'zova';
import type { ServiceOnion } from '../service/onion_.js';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch } from './onion';

export interface IAopRecord {}

export interface IDecoratorAopOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatch<keyof IBeanRecord>,
  IOnionOptionsDeps<keyof IAopRecord> {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    aop: ServiceOnion<IDecoratorAopOptions, keyof IAopRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    aop: OmitNever<IAopRecord>;
  }

  export interface IBeanSceneRecord {
    aop: never;
  }
}
