import type { FormAsyncValidateOrFn, FormOptions, FormValidateOrFn, useForm } from '@tanstack/vue-form';

export type ReturnTypeUseForm<
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
