import type { BehaviorForm } from 'zova-module-a-form';
import z from 'zod';
import { BeanControllerBase, ClientOnly, TypeEventOff, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ToolV } from 'zova-module-a-zod';
import { ApiSchemaACaptchaDtoCaptchaData } from 'zova-module-home-api';

export interface ControllerCaptchaProps {
  name: string;
  scene: string;
}

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  static $propsDefault = {};

  zodSchema: z.ZodString;
  eventFormSubmission: TypeEventOff;
  captchaData?: ApiSchemaACaptchaDtoCaptchaData;

  @Use()
  $$v: ToolV;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  protected async __init__() {
    // zodSchema
    this.zodSchema = this.$$v.required(z.string());
    // event
    this.eventFormSubmission = this.app.meta.event.on('a-form:formSubmission', (data, next) => {
      if (data.form.formId === this.$$behaviorForm.form.formId) {
        this.refreshCaptchaData();
      }
      return next();
    });
    // captcha data
    if (process.env.CLIENT) {
      this.createCaptchaData();
    }
  }

  protected __dispose__() {
    if (this.eventFormSubmission) {
      this.eventFormSubmission();
    }
  }

  private async createCaptchaData() {
    this.captchaData = await this.$api.captcha.create({
      scene: this.$props.scene,
    });
    this.setFieldCaptchaData();
  }

  private async refreshCaptchaData() {
    this.captchaData = await this.$api.captcha.refresh({
      id: this.captchaData!.id,
      scene: this.$props.scene,
    });
    this.setFieldCaptchaData();
  }

  private setFieldCaptchaData() {
    if (!this.captchaData?.token) return;
    this.$$behaviorForm.form.setFieldValue(this.$props.name, {
      id: this.captchaData.id,
      token: this.captchaData.token,
    });
  }

  protected render() {
    return (
      <>
        <ZFormField
          name={this.$props.name}
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
        <label class="flex items-center gap-2 w-full" style={{ height: '50px' }}>
          <ClientOnly>
            {this.captchaData?.payload && (
              <img
                class="cursor-pointer"
                src={this.captchaData!.payload as string}
                onClick={() => {
                  this.refreshCaptchaData();
                }}
              ></img>
            )}
          </ClientOnly>
        </label>
      </>
    );
  }
}
