import { classes } from 'typestyle';
import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZForm, ZFormField, ZFormSubscribe } from 'zova-module-a-form';
import { ApiSchemaTestSsrDtoTestBodyPartial } from 'zova-module-home-api';

@Render()
export class RenderPageToolOne extends BeanRenderBase {
  private _renderAuto() {
    return (
      <div>
        <ZForm
          controllerRef={ref => { this.controllerForm = ref; }}
          data={this.formData}
          schema={this.schemaUpdate}
          formMeta={this.formMeta}
          onSubmit={data => this.onSubmit(data)}
          onShowError={({ error }) => {
            // eslint-disable-next-line no-alert
            window.alert(error.message);
          }}
          slotFooter={(state, form) => {
            return (
              <div>
                {state.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
                {this.formMeta.formMode === 'edit' && (
                  <button
                    class={classes('btn btn-primary', state.isSubmitting && 'btn-disabled')}
                    onClick={async () => {
                      await form.handleSubmit();
                    }}
                  >
                    {this.scope.locale.Submit()}
                  </button>
                )}
              </div>
            );
          }}
        ></ZForm>
      </div>
    );
  }

  private _renderManual() {
    return;
    return (
      <ZForm
        data={this.formData}
        onSubmit={data => this.onSubmit(data)}
      >
        <ZFormField<ApiSchemaTestSsrDtoTestBodyPartial>
          name="name"
          label={`${this.scope.locale.YourName()}:`}
          validateOnDynamic={z.string().min(3)}
        ></ZFormField>
        <ZFormField
          name="name"
          slotDefault={({ props }) => {
            return (
              <input
                name={props.name}
                value={props.value}
                onInput={props.onInput}
                onBlur={props.onBlur}
              ></input>
            );
          }}
        >
        </ZFormField>
        <ZFormField name="name">
          <span>name</span>
        </ZFormField>
        <ZFormSubscribe slotDefault={state => {
          return (
            <button disabled={state.isSubmitting} type="submit" class="btn btn-primary">
              Submit
            </button>
          );
        }}
        ></ZFormSubscribe>
      </ZForm>
    );
  }

  public render() {
    return (
      <div>
        <div>{this._renderAuto()}</div>
        <div>------------------------------------</div>
        <div>
          {this._renderManual()}
        </div>
      </div>
    );
  }
}
