import { IBeanRecord, OmitNever } from 'zova';
import { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch } from './onion';
import { ServiceOnion } from '../service/onion_.js';

export interface IAopRecord {}

export interface IDecoratorAopOptions
  extends IOnionOptionsEnable,
    IOnionOptionsMatch<keyof IBeanRecord>,
    IOnionOptionsDeps<keyof IAopRecord> {}

declare module 'zova-module-a-bean' {
  export interface BeanOnion {
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
