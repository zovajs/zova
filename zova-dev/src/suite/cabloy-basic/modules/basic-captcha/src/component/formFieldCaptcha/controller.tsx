import { BeanControllerBase, ClientOnly, IComponentOptions, TypeEventOff, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormFieldPresetOptions, ZFormField } from 'zova-module-a-form';
import { ToolV } from 'zova-module-a-zod';
import { ICaptchaProviderRecord, IResourceFormFieldOptionsInput } from 'zova-module-basic-openapi';

export interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord | string;
  token?: unknown;
  payload?: unknown;
}

export interface ControllerFormFieldCaptchaProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldCaptcha extends BeanControllerBase {
  static $propsDefault = {
    preset: {
      Captcha: { scene: 'captcha-simple:simple' },
    },
  };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  eventFormSubmission: TypeEventOff;
  captchaData?: ICaptchaData;

  @Use()
  $$v: ToolV;

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected async __init__() {
    // event
    if (process.env.CLIENT) {
      this.eventFormSubmission = this.app.meta.event.on('a-form:formSubmission', (data, next) => {
        if (data.form.formId === this.$$form.form.formId && data.error) {
          this.refreshCaptchaData();
        }
        return next();
      });
    }
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

  get captchaScene() {
    return this.$props.preset!.Captcha!.scene!;
  }

  private async createCaptchaData() {
    this.captchaData = await this.$api.captcha.create(
      {
        scene: this.captchaScene,
      },
      { authToken: false },
    );
    this.setFieldCaptchaData();
  }

  private async refreshCaptchaData() {
    this.captchaData = await this.$api.captcha.refresh(
      {
        id: this.captchaData!.id,
        scene: this.captchaScene,
      },
      { authToken: false },
    );
    this.setFieldCaptchaData();
  }

  private setFieldCaptchaData() {
    this.$$form.setFieldValue(this.$props.name!, {
      id: this.captchaData?.id,
      token: this.captchaData?.token,
    });
  }

  protected render() {
    return (
      <>
        <ZFormField
          {...this.$props}
          slotDefault={({ props }, $$formField) => {
            const propsNew = {
              ...props,
              type: 'text',
              class: 'grow',
              placeholder: this.scope.locale.InputCaptcha(),
              value: this.captchaData?.token,
              onInput: (e: Event) => {
                const token = (e.target as HTMLInputElement).value;
                if (this.captchaData) {
                  this.captchaData.token = token;
                }
                $$formField.setValue({
                  id: this.captchaData?.id,
                  token,
                });
              },
            } satisfies IResourceFormFieldOptionsInput;
            return <input {...propsNew}></input>;
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
