import type { OmitNever } from 'zova';
import type { IOnionOptionsEnable, ServiceOnion } from 'zova-module-a-bean';

export interface ITableFeatureRecord {}

export interface IDecoratorTableFeatureOptions
  extends IOnionOptionsEnable {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
    tableFeature: ServiceOnion<IDecoratorTableFeatureOptions, keyof ITableFeatureRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    tableFeature: OmitNever<ITableFeatureRecord>;
  }

  export interface IBeanSceneRecord {
    tableFeature: never;
  }
}
