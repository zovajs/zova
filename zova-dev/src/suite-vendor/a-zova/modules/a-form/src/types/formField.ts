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

export interface IFormFieldOptionsBase extends IFormFieldModelOptionsBase {
  behaviorModel?: IBehaviors | boolean;
  render?: TypeRenderComponentProvider;
  placeholder?: string;
  validateOnDynamic?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface IFormFieldModelOptionsBase {
  value?: any;
  readonly?: boolean;
  type?: HTMLInputElementType;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IFormFieldOptions<TParentData>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase {}

export interface IBehaviorPropsInputFormFieldLayoutBase {
  class?: any;
}

export interface IBehaviorPropsOutputFormFieldLayoutBase extends IBehaviorPropsInputFormFieldLayoutBase {}
