import z from 'zod';
import { BeanControllerBase, ClientOnly, Use } from 'zova';
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
          name="captcha"
          validators={{ onDynamic: this.zodSchema }}
          slotDefault={(props, field) => {
            return (
              <input
                type="text"
                class="grow"
                placeholder={this.scope.locale.InputCaptcha()}
                name={props.name}
                value={this.captchaData?.token}
                onInput={(e: Event) => {
                  const token = (e.target as HTMLInputElement).value;
                  if (this.captchaData) {
                    this.captchaData.token = token;
                  }
                  field.api.handleChange({
                    id: this.captchaData?.id,
                    token,
                  });
                }}
                onBlur={props.onBlur}
              ></input>
            );
          }}
        ></ZFormField>
        <ClientOnly>
          <label class="flex items-center gap-2 w-full">
            {this.captchaData?.payload && <img src={this.captchaData!.payload as string}></img>}
          </label>
        </ClientOnly>
      </>
    );
  }
}
