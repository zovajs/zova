import type { SchemaObject } from 'openapi3-ts/oas31';
import type { VNode } from 'vue';
import type z from 'zod';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type { IBehaviorItem } from 'zova-module-a-behavior';
import type { IIconRecord } from 'zova-module-a-icon';
import type {
  IJsxRenderContextBase,
  ISchemaObjectExtensionFieldRestPropsPreset,
  TypeFormFieldRenderComponent,
  TypeFormFieldRenderComponentProvider,
} from 'zova-module-a-openapi';

import type { ControllerForm } from '../component/form/controller.jsx';
import type { ControllerFormField } from '../component/formField/controller.jsx';
import type { TypeBehaviorFormFieldOptions } from './form.js';

export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';
export const inputTypePresets = ['text', 'password', 'number', 'file', 'hidden', 'tel', 'email'];
export const constFieldProps = '$$FieldProps';

export interface IFormFieldScope<TParentData = {}> {
  name: string;
  value: any;
  property?: SchemaObject;
  displayValue?: any;
  render?: IFormFieldRenderContext<TParentData>;
}

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

export type TypeFormFieldOnSetDisplayValue = (value: any) => any;
export type TypeFormFieldDisplayValueUpdateTiming = 'input' | 'change';

export interface IFormFieldOptionsBase {
  render?: TypeFormFieldRenderComponent;
  preset?: ISchemaObjectExtensionFieldRestPropsPreset;
  displayValue?: any;
  displayValueUpdateTiming?: TypeFormFieldDisplayValueUpdateTiming;
  onSetDisplayValue?: TypeFormFieldOnSetDisplayValue;
  disableNotifyChanged?: boolean;
  class?: any;
  placeholder?: string;
  readonly?: boolean;
  inputType?: HTMLInputElementType;
  validateOnDynamic?: boolean | z.ZodType;
  validateOnChange?: boolean | z.ZodType;
  validateOnBlur?: boolean | z.ZodType;
  onChange?: (e: Event) => void; // allow set to null, but not provide null type
  onInput?: (e: Event) => void; // allow set to null, but not provide null type
  onBlur?: (e: Event) => void; // allow set to null, but not provide null type
}

export interface IFormFieldOptions<TParentData = {}>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase, IFormFieldLayoutOptionsBase {
  behaviors?: IBehaviorItem;
  slotDefault?: (props: IFormFieldRenderContext<TParentData>, formField: ControllerFormField) => VNode;
}

export interface IFormFieldRenderContextProps {
  name?: string;
  value?: any;
  type?: any; // not use string for quasar
  readonly?: boolean;
  placeholder?: string;
  class?: any;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IFormFieldRenderContextPropsBucket<TParentData = {}> extends Omit<IFormFieldOptions<TParentData>, 'render'> {
  render: TypeFormFieldRenderComponent;
  renderFlattern?: TypeFormFieldRenderComponent;
  renderProvider?: TypeFormFieldRenderComponentProvider;
}

export interface IFormFieldRenderContext<TParentData = {}> {
  propsBucket: IFormFieldRenderContextPropsBucket<TParentData>;
  props: IFormFieldRenderContextProps;
  celScope: IFormFieldScope<TParentData>;
  jsxRenderContext: {};
}

export interface IJsxRenderContextFormField<TParentData extends {} = {}, TSubmitMeta = never> extends IJsxRenderContextBase {
  $celScope: IFormFieldScope<TParentData>;
  $$formField: ControllerFormField<TParentData> | undefined;
  $$form: ControllerForm<TParentData, TSubmitMeta>;
}

export interface IJsxRenderContextForm<TParentData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IFormFieldScope<TParentData>;
  $$form: ControllerForm<TParentData>;
}
