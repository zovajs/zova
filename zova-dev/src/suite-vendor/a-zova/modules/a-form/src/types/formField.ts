import type { VNode } from 'vue';
import type z from 'zod';
import type { IBehaviorItem } from 'zova-module-a-behavior';
import type { IIconRecord } from 'zova-module-a-icon';
import type { TypeRenderComponentProvider } from 'zova-module-a-openapi';
import type { TypeBehaviorFormFieldOptions, TypeFormField } from './form.js';

export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';

export interface IFormFieldLayoutOptionsBase {
  label?: string | false;
  inline?: boolean;
  bordered?: boolean;
  floating?: boolean;
  iconPrefix?: keyof IIconRecord;
  iconSuffix?: keyof IIconRecord;
}

export interface IFormFieldOptionsBase extends IFormFieldModelOptionsBase {
  render?: TypeRenderComponentProvider;
  placeholder?: string;
  readonly?: boolean;
  type?: HTMLInputElementType;
  validateOnDynamic?: boolean | z.ZodType;
  validateOnChange?: boolean | z.ZodType;
  validateOnBlur?: boolean | z.ZodType;
}

export interface IFormFieldModelOptionsBase {}

export interface IFormFieldOptions<TParentData = {}> extends IFormFieldRenderContextProps<TParentData> {
  behaviors?: IBehaviorItem;
  slotDefault?: (props: IFormFieldRenderContext<TParentData>, field: TypeFormField<TParentData>) => VNode;
}

export interface IFormFieldRenderContextProps<TParentData = {}>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase, IFormFieldLayoutOptionsBase {}

export interface IFormFieldRenderContext<TParentData = {}> {
  options: IFormFieldOptions<TParentData>;
  props: IFormFieldRenderContextProps<TParentData>;
}

export interface IBehaviorPropsInputFormFieldModelBase {
  name: string;
  readonly?: boolean;
  type?: HTMLInputElementType;
  value?: any;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IBehaviorPropsOutputFormFieldModelBase extends IBehaviorPropsInputFormFieldModelBase {}

export interface IBehaviorPropsInputFormFieldLayoutBase {
  class?: any;
}

export interface IBehaviorPropsOutputFormFieldLayoutBase extends IBehaviorPropsInputFormFieldLayoutBase {}
