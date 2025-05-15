import type { DeepKeys, DeepValue, FieldAsyncValidateOrFn, FieldOptions, FieldValidateOrFn, FormApi, FormAsyncValidateOrFn, FormOptions, FormValidateOrFn, useField, useForm } from '@tanstack/vue-form';
import type { UnwrapNestedRefs } from 'vue';

export type TypeForm<
  TFormData = unknown,
  TFormOnMount extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChange extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta = never,
>
 = ReturnType<typeof useForm<
   TFormData,
   TFormOnMount,
   TFormOnChange,
   TFormOnChangeAsync,
   TFormOnBlur,
   TFormOnBlurAsync,
   TFormOnSubmit,
   TFormOnSubmitAsync,
   TFormOnServer,
   TSubmitMeta
 >>;

export type TypeBehaviorFormOptions<
  TFormData = unknown,
  TFormOnMount extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChange extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta = never,
>
 = FormOptions<
   TFormData,
   TFormOnMount,
   TFormOnChange,
   TFormOnChangeAsync,
   TFormOnBlur,
   TFormOnBlurAsync,
   TFormOnSubmit,
   TFormOnSubmitAsync,
   TFormOnServer,
   TSubmitMeta
 >;

export type TypeFormField<
  TParentData = unknown,
  TName extends DeepKeys<TParentData> = DeepKeys<TParentData>,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
  TOnMount extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnChange extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnChangeAsync
  extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
  TOnBlur extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnBlurAsync extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
  TOnSubmit extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnSubmitAsync
  extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
  TFormOnMount extends undefined | FormValidateOrFn<TParentData> = undefined | FormValidateOrFn<TParentData>,
  TFormOnChange extends undefined | FormValidateOrFn<TParentData> = undefined | FormValidateOrFn<TParentData>,
  TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TParentData> = undefined | FormAsyncValidateOrFn<TParentData>,
  TFormOnBlur extends undefined | FormValidateOrFn<TParentData> = undefined | FormValidateOrFn<TParentData>,
  TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TParentData> = undefined | FormAsyncValidateOrFn<TParentData>,
  TFormOnSubmit extends undefined | FormValidateOrFn<TParentData> = undefined | FormValidateOrFn<TParentData>,
  TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TParentData> = undefined | FormAsyncValidateOrFn<TParentData>,
  TFormOnServer extends undefined | FormAsyncValidateOrFn<TParentData> = undefined | FormAsyncValidateOrFn<TParentData>,
  TParentSubmitMeta = never,
> = UnwrapNestedRefs<ReturnType<typeof useField<
  TParentData,
  TName,
  TData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TFormOnMount,
  TFormOnChange,
  TFormOnChangeAsync,
  TFormOnBlur,
  TFormOnBlurAsync,
  TFormOnSubmit,
  TFormOnSubmitAsync,
  TFormOnServer,
  TParentSubmitMeta
>>>;

export type TypeBehaviorFormFieldOptions<
  TParentData = unknown,
  TName extends DeepKeys<TParentData> = DeepKeys<TParentData>,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
  TOnMount extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnChange extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnChangeAsync
  extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
  TOnBlur extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnBlurAsync extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
  TOnSubmit extends undefined | FieldValidateOrFn<TParentData, TName, TData> = undefined | FieldValidateOrFn<TParentData, TName, TData>,
  TOnSubmitAsync
  extends undefined | FieldAsyncValidateOrFn<TParentData, TName, TData> = undefined | FieldAsyncValidateOrFn<TParentData, TName, TData>,
> =
 FieldOptions<
   TParentData,
   TName,
   TData,
   TOnMount,
   TOnChange,
   TOnChangeAsync,
   TOnBlur,
   TOnBlurAsync,
   TOnSubmit,
   TOnSubmitAsync
 >;

export interface TypeFormOnSubmitData<
  TFormData = unknown,
  TFormOnMount extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChange extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta = never,
> {
  value: TFormData;
  formApi: FormApi<
    TFormData,
    TFormOnMount,
    TFormOnChange,
    TFormOnChangeAsync,
    TFormOnBlur,
    TFormOnBlurAsync,
    TFormOnSubmit,
    TFormOnSubmitAsync,
    TFormOnServer,
    TSubmitMeta
  >;
  meta: TSubmitMeta;
}

export type TypeFormOnSubmit<
  TFormData = unknown,
  TFormOnMount extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChange extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined | FormValidateOrFn<TFormData>,
  TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TFormOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta = never,
>
 = (props: TypeFormOnSubmitData<
   TFormData,
   TFormOnMount,
   TFormOnChange,
   TFormOnChangeAsync,
   TFormOnBlur,
   TFormOnBlurAsync,
   TFormOnSubmit,
   TFormOnSubmitAsync,
   TFormOnServer,
   TSubmitMeta
 >) => any | Promise<any>;
