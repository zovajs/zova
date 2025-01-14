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

import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    behavior?: number;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      behavior?: number;
    }
  }
}
