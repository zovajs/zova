import type { Component, VNode } from 'vue';
import type { OmitNever } from 'zova';

import type { IOnionOptionsEnable, ServiceOnion } from 'zova-module-a-bean';
import 'vue';
import 'vue/jsx-runtime';

export type NextBehavior<PROPS_OUTPUT = unknown> = (props?: PROPS_OUTPUT) => VNode;

export interface IBehaviorTag {
  component: string | Component;
  name?: string;
}

export type IBehaviorItem = {
  [prop in keyof IBehaviorRecord]?: Partial<IBehaviorRecord[prop]>;
};

export type IBehaviors = keyof IBehaviorRecord | IBehaviorItem | (keyof IBehaviorRecord | IBehaviorItem)[];

export interface IBehaviorRecord {}

export interface IDecoratorBehaviorOptions extends IOnionOptionsEnable {}

declare module 'zova-module-a-bean' {
  export interface SysOnion {
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

  export interface ILoggerClientChildRecord {
    behavior: never;
  }
}

declare module 'vue' {
  export interface InputHTMLAttributes {
    behaviors?: IBehaviors;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      behaviors?: IBehaviors;
    }
  }
}
