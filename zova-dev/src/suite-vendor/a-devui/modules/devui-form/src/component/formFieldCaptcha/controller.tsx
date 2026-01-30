import { BeanControllerBase, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';

export interface ControllerFormFieldCaptchaProps extends IFormFieldOptions {}

@Controller()
export class ControllerFormFieldCaptcha extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    return (
      <ZFormField
        {...this.$props}
      ></ZFormField>
    );
  }
}
