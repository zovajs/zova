import z from 'zod';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ToolV } from 'zova-module-a-zod';
import { ApiSchemaACaptchaDtoCaptchaData } from 'zova-module-home-api';

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  zodSchema: z.ZodString;
  captchaData?: ApiSchemaACaptchaDtoCaptchaData;

  @Use()
  $$v: ToolV;

  protected async __init__() {
    this.zodSchema = this.$$v.required(z.string());
    if (process.env.CLIENT) {
      this.captchaData = await this.$api.captcha.create({
        scene: 'a-captchasimple:simple',
      });
    }
  }

  protected render() {
    return (
      <>
        <ZFormField
          name="captcha.token"
          validators={{ onDynamic: this.zodSchema }}
          value={{
            id: this.captchaData?.id,
            token: this.captchaData?.token,
          }}
        ></ZFormField>
        <label class="flex items-center gap-2 w-full">
          {this.captchaData?.payload && <img src={this.captchaData!.payload as string}></img>}
        </label>
      </>
    );
  }
}
