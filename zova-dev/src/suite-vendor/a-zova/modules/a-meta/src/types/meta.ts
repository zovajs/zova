import { OmitNever } from 'zova';

export interface IMetaRecord {}

export interface IDecoratorMetaOptions {}

declare module 'zova' {
  export interface ConfigOnions {
    meta: OmitNever<IMetaRecord>;
  }

  export interface IBeanSceneRecord {
    meta: never;
  }
}
