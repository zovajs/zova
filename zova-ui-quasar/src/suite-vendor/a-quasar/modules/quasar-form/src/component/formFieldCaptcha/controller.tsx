import type { QInputProps } from 'quasar';
import { QInput } from 'quasar';
import { BeanControllerBase, ClientOnly, IComponentOptions, TypeEventOff, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormFieldOptions, ZFormField } from 'zova-module-a-form';
import { ICaptchaData, ICaptchaOptions } from 'zova-module-a-openapi';
import { ToolV } from 'zova-module-a-zod';

export interface ControllerFormFieldCaptchaProps extends IFormFieldOptions {
  captcha?: ICaptchaOptions;
}

@Controller()
export class ControllerFormFieldCaptcha extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

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
    return this.$props.captcha?.scene ?? 'captcha-simple:simple';
  }

  private async createCaptchaData() {
    this.captchaData = await this.$api.captcha.create({
      scene: this.captchaScene,
    }, { authToken: false });
    this.setFieldCaptchaData();
  }

  private async refreshCaptchaData() {
    this.captchaData = await this.$api.captcha.refresh({
      id: this.captchaData!.id,
      scene: this.captchaScene,
    }, { authToken: false });
    this.setFieldCaptchaData();
  }

  private setFieldCaptchaData() {
    this.$$form.setFieldValue(this.$props.name, {
      id: this.captchaData?.id,
      token: this.captchaData?.token,
    });
  }

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        render="text"
        slotDefault={({ props }, $$formField) => {
          const propsNew: QInputProps = {
            ...props,
            'label': this.scope.locale.InputCaptcha(),
            'modelValue': this.captchaData?.token as any,
            'onUpdate:modelValue': token => {
              if (this.captchaData) {
                this.captchaData.token = token;
              }
              $$formField.field.api.handleChange({
                id: this.captchaData?.id,
                token,
              });
            },
          };
          return (
            <QInput
              {...propsNew}
            >
              {{
                append: () => this._renderCaptcha(),
              }}
            </QInput>
          );
        }}
      ></ZFormField>
    );
  }

  private _renderCaptcha() {
    return (
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
    );
  }
}
