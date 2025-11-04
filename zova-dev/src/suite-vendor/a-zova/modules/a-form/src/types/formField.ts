import type { IBehaviors } from 'zova-module-a-behavior';
import type { IIconRecord } from 'zova-module-a-icon';
import type { TypeBehaviorFormFieldOptions } from './form.js';

export interface IFormFieldLayoutOptionsBase {
  label?: string | false;
  bordered?: boolean;
  iconPrefix?: keyof IIconRecord;
  iconSuffix?: keyof IIconRecord;
}

export interface IFormFieldOptionsBase {
  behaviorModel?: IBehaviors | boolean;
}

export interface IFormFieldOptions<TParentData>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase {}

export interface IBehaviorPropsInputFormFieldLayoutBase {
  class?: any;
}

export interface IBehaviorPropsOutputFormFieldLayoutBase extends IBehaviorPropsInputFormFieldLayoutBase {}
