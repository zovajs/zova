import { OmitNever } from 'zova';
import { IOnionOptionsEnable, ServiceOnion } from 'zova-module-a-bean';

export type NextBehaviorProps<PROPS> = () => PROPS;
export type NextBehaviorRender = () => VNode;

export interface IBehaviorTag {
  component: string | Component;
  name?: string;
}

export interface IBehaviorComposeData {
  behaviorTag: IBehaviorTag;
  method: 'props' | 'render';
  props?: any;
}

export type IBehaviorItem = {
  [prop in keyof IBehaviorRecord]?: Partial<IBehaviorRecord[prop]>;
};

export interface IBehaviorRecord {}

export interface IBehaviorProps<PROPS> {
  props(options: IDecoratorBehaviorOptions, behaviorTag: IBehaviorTag, next: NextBehaviorProps<PROPS>): PROPS;
}

export interface IBehaviorRender<PROPS> {
  render(props: PROPS, options: IDecoratorBehaviorOptions, behaviorTag: IBehaviorTag, next: NextBehaviorRender): VNode;
}

export interface IDecoratorBehaviorOptions extends IOnionOptionsEnable {}

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
import { Component, VNode } from 'vue';

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
