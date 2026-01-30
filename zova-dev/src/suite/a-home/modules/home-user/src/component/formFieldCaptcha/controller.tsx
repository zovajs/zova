import type { ControllerForm, IFormFieldOptions } from 'zova-module-a-form';
import z from 'zod';
import { BeanControllerBase, ClientOnly, IComponentOptions, TypeEventOff, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ICaptchaOptions } from 'zova-module-a-openapi';
import { ToolV } from 'zova-module-a-zod';
import { ApiSchemaACaptchaDtoCaptchaData } from 'zova-module-home-api';

export interface ControllerFormFieldCaptchaProps extends IFormFieldOptions {

}

@Controller()
export class ControllerFormFieldCaptcha extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };
}
