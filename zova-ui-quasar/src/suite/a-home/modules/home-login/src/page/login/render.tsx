import { QBtn, QCard, QSeparator } from 'quasar';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZForm, ZFormFieldBlank, ZFormFieldWrapper } from 'zova-module-a-form';
import { ZIcon } from 'zova-module-a-icon';

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
              <h5 class="text-center" style={{ marginBottom: '12px' }}>
                {this.scope.locale.Login()}
              </h5>
              <div class="q-pa-md">
                {this._renderForm()}
                <QSeparator inset style={{ marginTop: '24px', marginBottom: '24px' }}></QSeparator>
                {this._renderGithub()}
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
        class="q-gutter-md"
        data={this.user}
        schema={this.schema}
        onSubmitData={data => {
          return this.onSubmitLogin(data);
        }}
        onShowError={({ error }) => {
          // eslint-disable-next-line no-alert
          window.alert(error.message);
        }}
      >
        <ZFormFieldWrapper name="username" iconPrefix=":daisy:person" label={this.scope.locale.YourUsername()}></ZFormFieldWrapper>
        <ZFormFieldWrapper name="password" inputType="password" iconPrefix=":daisy:lock" label={this.scope.locale.YourPassword()}></ZFormFieldWrapper>
        <ZFormFieldWrapper name="captcha"></ZFormFieldWrapper>
        <ZFormFieldBlank
          slotDefault={$$form => {
            return (
              <div class="text-center">
                <QBtn label={this.scope.locale.Login()} disable={$$form.formState.isSubmitting} type="submit" color="primary"></QBtn>
              </div>
            );
          }}
        ></ZFormFieldBlank>
      </ZForm>
    );
  }

  _renderGithub() {
    return (
      <div class="text-center">
        <QBtn
          class="btn mt-2 w-full btn-default"
          onClick={() => {
            this.onSubmitLoginGitHub();
          }}
        >
          <ZIcon name=":auth:github" width={24}></ZIcon>
          {this.scope.locale.LoginGitHub()}
        </QBtn>
      </div>
    );
  }
}
