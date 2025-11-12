import type { ModelCaptcha } from 'zova-module-a-captcha';
import z from 'zod';
import { BeanControllerBase, Use, usePrepareArg } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ToolV } from 'zova-module-a-zod';

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  zodSchema: z.ZodString;

  @Use()
  $$v: ToolV;

  @Use({ beanFullName: 'a-captcha.model.captcha' })
  get $$modelCaptcha(): ModelCaptcha {
    return usePrepareArg('a-captchasimple:simple', true);
  }

  protected async __init__() {
    this.zodSchema = this.$$v.required(z.string());
  }

  protected render() {
    const queryCaptchaData = this.$$modelCaptcha.getCaptchaData();
    console.log(queryCaptchaData);
    return (
      <>
        <ZFormField
          name="captcha.token"
          validators={{ onDynamic: this.zodSchema }}
        ></ZFormField>
        <label class="flex items-center gap-2 w-full">
          <img src={queryCaptchaData.data?.payload as string}></img>
        </label>
      </>
    );
  }
}
