import { VBtn, VCard, VCol, VContainer, VRow } from 'vuetify/components';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZForm, ZFormField, ZFormFieldWrapper, ZFormSubscribe } from 'zova-module-a-form';

@Render()
export class RenderPageLogin extends BeanRenderBase {
  public render() {
    return (
      <div class="pa-4 d-flex align-center justify-center" style={{ minHeight: '100vh' }}>
        <VCard class="elevation-2" style={{ width: '100%', maxWidth: '960px' }}>
          <VRow>
            <VCol cols={12} md={6} style={{ background: 'var(--v-theme-surface)', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
              {this._renderLandingInfo()}
            </VCol>
            <VCol cols={12} md={6} style={{ minWidth: '320px' }}>
              <h2 class="text-center" style={{ marginBottom: '12px' }}>{this.scope.locale.Login()}</h2>
              <div class="pa-4">
                {this._renderForm()}
              </div>
            </VCol>
          </VRow>
        </VCard>
      </div>
    );
  }

  _renderLandingInfo() {
    return (
      <div style={{ minHeight: '100%' }}>
        <div style={{ padding: '48px 0' }}>
          <div style={{ maxWidth: '360px', margin: '0 auto' }}>
            <h1 class="text-center font-bold">Zova</h1>
            <h2 class="text-center" style={{ opacity: 0.4 }}>Less is more, while more is less</h2>
          </div>
        </div>
      </div>
    );
  }

  _renderForm() {
    return (
      <ZForm
        class="d-grid"
        data={this.user}
        schema={this.schema}
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
          label={this.scope.locale.YourUsername()}
        >
        </ZFormField>
        <ZFormField
          name="password"
          inputType="password"
          iconPrefix=":daisy:lock"
          label={this.scope.locale.YourPassword()}
        ></ZFormField>
        <ZFormFieldWrapper name="captcha"></ZFormFieldWrapper>
        <ZFormSubscribe slotDefault={$$form => {
          return (
            <VBtn
              disabled={$$form.formState.isSubmitting}
              type="submit"
              color="primary"
            >
              {this.scope.locale.Login()}
            </VBtn>
          );
        }}
        >
        </ZFormSubscribe>
      </ZForm>
    );
  }
}
