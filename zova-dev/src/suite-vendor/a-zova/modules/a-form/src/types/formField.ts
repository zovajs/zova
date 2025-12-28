import type { VNode } from 'vue';
import type z from 'zod';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type { IBehaviorItem } from 'zova-module-a-behavior';
import type { IIconRecord } from 'zova-module-a-icon';
import type { TypeRenderComponent, TypeRenderComponentProvider } from 'zova-module-a-openapi';
import type { TypeBehaviorFormFieldOptions, TypeFormField } from './form.js';

export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';
export const inputTypePresets = ['text', 'password', 'number', 'file', 'hidden', 'tel', 'email'];

export interface IFormFieldLayoutOptionsBase {
  classContainer?: any;
  label?: string | false;
  inline?: boolean;
  bordered?: boolean;
  floating?: boolean;
  iconPrefix?: keyof IIconRecord;
  iconSuffix?: keyof IIconRecord;
  header?: TypeRenderComponentJsx | string;
  footer?: TypeRenderComponentJsx | string;
}

export type TypeFormFieldOnDisplayValueUpdate = (value: any) => any;
export interface IFormFieldOptionsBase {
  render?: TypeRenderComponent;
  displayValue?: any;
  onDisplayValueUpdate?: TypeFormFieldOnDisplayValueUpdate;
  class?: any;
  placeholder?: string;
  readonly?: boolean;
  inputType?: HTMLInputElementType;
  validateOnDynamic?: boolean | z.ZodType;
  validateOnChange?: boolean | z.ZodType;
  validateOnBlur?: boolean | z.ZodType;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IFormFieldOptions<TParentData = {}>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase, IFormFieldLayoutOptionsBase {
  behaviors?: IBehaviorItem;
  slotDefault?: (props: IFormFieldRenderContext<TParentData>, field: TypeFormField<TParentData>) => VNode;
}

export interface IFormFieldRenderContextProps {
  name?: string;
  value?: any;
  type?: string;
  readonly?: boolean;
  placeholder?: string;
  class?: any;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IFormFieldRenderContextOptions<TParentData = {}> extends Omit<IFormFieldOptions<TParentData>, 'render'> {
  render: TypeRenderComponent;
  renderFlattern?: TypeRenderComponent;
  renderProvider?: TypeRenderComponentProvider;
}

export interface IFormFieldRenderContext<TParentData = {}> {
  options: IFormFieldRenderContextOptions<TParentData>;
  props: IFormFieldRenderContextProps;
}
