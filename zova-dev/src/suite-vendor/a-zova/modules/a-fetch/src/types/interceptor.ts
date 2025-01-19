import { OmitNever } from 'zova';
import { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion } from 'zova-module-a-bean';

export interface IInterceptorRecord {}

export interface IDecoratorInterceptorOptions
  extends IOnionOptionsEnable,
    IOnionOptionsMatch<string>,
    IOnionOptionsDeps<keyof IInterceptorRecord> {}

declare module 'zova-module-a-bean' {
  export interface BeanOnion {
    interceptor: ServiceOnion<IDecoratorInterceptorOptions, keyof IInterceptorRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    interceptor: OmitNever<IInterceptorRecord>;
  }

  export interface IBeanSceneRecord {
    interceptor: never;
  }
}
