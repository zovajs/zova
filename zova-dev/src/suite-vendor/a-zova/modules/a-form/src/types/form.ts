import type { FormAsyncValidateOrFn, FormOptions, FormValidateOrFn } from '@tanstack/vue-form';

export type TypeBehaviorFormOptions<
  TFormData,
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
