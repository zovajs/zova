import { QCard, QInput } from 'quasar';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZForm, ZFormField, ZFormFieldWrapper, ZFormSubscribe } from 'zova-module-a-form';

@Render()
export class RenderPageLogin extends BeanRenderBase {
  public render() {
    return (
      <div class="q-pa-md row items-center justify-center" style={{ minHeight: '100vh' }}>
        <QCard class="shadow-2" style={{ width: '100%', maxWidth: '960px' }}>
          <div class="row">
            <div class="col-12 col-md-6" style={{ background: 'var(--q-color-grey-3)', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
              {this._renderLandingInfo()}
            </div>
            <div class="col-12 col-md-6" style={{ minWidth: '320px' }}>
              <h5 class="text-center" style={{ marginBottom: '12px' }}>{this.scope.locale.Login()}</h5>
              <div>
                {this._renderForm()}
              </div>
            </div>
          </div>
        </QCard>
      </div>
    );
  }

  _renderLandingInfo() {
    return (
      <div class="min-h-full rounded-l-xl bg-base-200">
        <div class="py-12">
          <div class="max-w-md">
            <h1 class="text-center font-bold">Zova</h1>
            <h5 class="text-center opacity-40">Less is more, while more is less</h5>
          </div>
        </div>
      </div>
    );
  }

  _renderForm() {
    return (
      <ZForm
        data={this.user}
        schema={this.schema}
        formProvider={{ behaviors: { formFieldLayout: 'home-user:formFieldLayoutLogin' } }}
        onSubmit={data => {
          return this.onSubmitLogin(data);
        }}
        onShowError={({ error }) => {
          // eslint-disable-next-line no-alert
          window.alert(error.message);
        }}
      >
        <ZFormField
          name="username"
          iconPrefix=":daisy:person"
          slotDefault={({ props }) => {
            return (
              <QInput
                type="text"
                class="grow"
                label={this.scope.locale.YourUsername()}
                name={props.name}
                modelValue={props.value}
                onUpdate:modelValue={props.onUpdateValue}
                onBlur={props.onBlur}
              />
            );
          }}
        >
        </ZFormField>
        <ZFormField name="password" class="grow" inputType="password" iconPrefix=":daisy:lock"></ZFormField>
        <ZFormFieldWrapper name="captcha"></ZFormFieldWrapper>
        <ZFormSubscribe slotDefault={$$form => {
          return (
            <button disabled={$$form.formState.isSubmitting} type="submit" class="btn mt-2 w-full btn-primary">
              {this.scope.locale.Login()}
            </button>
          );
        }}
        >
        </ZFormSubscribe>
      </ZForm>
    );
  }
}
