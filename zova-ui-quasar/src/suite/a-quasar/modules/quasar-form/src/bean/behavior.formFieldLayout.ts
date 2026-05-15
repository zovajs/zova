import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

import { types } from 'typestyle';
import { TypeRenderComponentJsx } from 'zova-jsx';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';
import { IIconRecord } from 'zova-module-a-icon';

declare module 'zova-module-a-openapi' {
  export interface IResourceFormFieldLayoutOptions extends IBehaviorResourceFormFieldLayoutOptions {}
}

export interface IBehaviorResourceFormFieldLayoutOptions {
  disable?: boolean;
  class?: any;
  style?: types.NestedCSSProperties;
  label?: string;
  inline?: boolean;
  bordered?: boolean;
  floating?: boolean;
  iconPrefix?: keyof IIconRecord;
  iconSuffix?: keyof IIconRecord;
  header?: TypeRenderComponentJsx | string;
  footer?: TypeRenderComponentJsx | string;
}

export interface IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorPropsOutputFormFieldLayout extends IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  protected render(
    _props: IBehaviorPropsInputFormFieldLayout,
    next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>,
  ): VNode {
    return next();
  }
}
