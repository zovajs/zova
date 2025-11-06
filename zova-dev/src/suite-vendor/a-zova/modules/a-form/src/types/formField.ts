import type { IBehaviors } from 'zova-module-a-behavior';
import type { IIconRecord } from 'zova-module-a-icon';
import type { TypeRenderComponentProvider } from 'zova-module-a-openapi';
import type { TypeBehaviorFormFieldOptions } from './form.js';

export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';

export interface IFormFieldLayoutOptionsBase {
  label?: string | false;
  bordered?: boolean;
  iconPrefix?: keyof IIconRecord;
  iconSuffix?: keyof IIconRecord;
}

export interface IFormFieldOptionsBase {
  behaviorModel?: IBehaviors | boolean;
  render?: TypeRenderComponentProvider;
  inputType?: HTMLInputElementType;
  placeholder?: string;
}

export interface IFormFieldOptions<TParentData>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase {}

export interface IBehaviorPropsInputFormFieldLayoutBase {
  class?: any;
}

export interface IBehaviorPropsOutputFormFieldLayoutBase extends IBehaviorPropsInputFormFieldLayoutBase {}
