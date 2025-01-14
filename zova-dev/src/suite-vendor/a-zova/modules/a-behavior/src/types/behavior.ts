import { OmitNever } from 'zova';
import { ServiceOnion } from 'zova-module-a-bean';

export interface IBehaviorRecord {}

export interface IDecoratorBehaviorOptions {}

declare module 'zova-module-a-bean' {
  export interface BeanOnion {
    behavior: ServiceOnion<IDecoratorBehaviorOptions, keyof IBehaviorRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    behavior: OmitNever<IBehaviorRecord>;
  }

  export interface IBeanSceneRecord {
    behavior: never;
  }
}
