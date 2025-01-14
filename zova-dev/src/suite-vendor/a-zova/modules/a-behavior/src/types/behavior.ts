import { OmitNever } from 'zova';
import { IOnionItem, ServiceOnion } from 'zova-module-a-bean';

export interface IBehaviorTag {
  component: string | Component;
  name?: string;
  type?: string;
}

export type IBehaviorItem = IOnionItem<IDecoratorBehaviorOptions, keyof IBehaviorRecord>;

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
import { Component } from 'vue';

declare module 'vue' {
  export interface InputHTMLAttributes {
    behaviors?: IBehaviorItem | IBehaviorItem[];
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      behaviors?: IBehaviorItem | IBehaviorItem[];
    }
  }
}
