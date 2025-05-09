import type { FormApi, FormAsyncValidateOrFn, FormOptions, FormValidateOrFn, VueFormApi } from '@tanstack/vue-form';
import { useForm } from '@tanstack/vue-form';
import { markRaw } from 'vue';
import { BeanControllerBase } from 'zova';

export class BeanControllerFormBase extends BeanControllerBase {
  public $useForm<
    TParentData,
    TFormOnMount extends undefined | FormValidateOrFn<TParentData>,
    TFormOnChange extends undefined | FormValidateOrFn<TParentData>,
    TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TParentData>,
    TFormOnBlur extends undefined | FormValidateOrFn<TParentData>,
    TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TParentData>,
    TFormOnSubmit extends undefined | FormValidateOrFn<TParentData>,
    TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TParentData>,
    TFormOnServer extends undefined | FormAsyncValidateOrFn<TParentData>,
    TSubmitMeta,
  >(opts?: FormOptions<
    TParentData,
    TFormOnMount,
    TFormOnChange,
    TFormOnChangeAsync,
    TFormOnBlur,
    TFormOnBlurAsync,
    TFormOnSubmit,
    TFormOnSubmitAsync,
    TFormOnServer,
    TSubmitMeta
  >,
  ):
    FormApi<
      TParentData,
      TFormOnMount,
      TFormOnChange,
      TFormOnChangeAsync,
      TFormOnBlur,
      TFormOnBlurAsync,
      TFormOnSubmit,
      TFormOnSubmitAsync,
      TFormOnServer,
      TSubmitMeta
    > & VueFormApi<
      TParentData,
      TFormOnMount,
      TFormOnChange,
      TFormOnChangeAsync,
      TFormOnBlur,
      TFormOnBlurAsync,
      TFormOnSubmit,
      TFormOnSubmitAsync,
      TFormOnServer,
      TSubmitMeta
    > {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useForm(opts));
    });
  }
}
