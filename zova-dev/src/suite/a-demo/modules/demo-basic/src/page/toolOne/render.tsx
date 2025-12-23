import { classes } from 'typestyle';
import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZForm, ZFormField } from 'zova-module-a-form';

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
        ></ZForm>
        <div>
          {this.controllerForm?.formState.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
          {this.formMeta.formMode === 'edit' && (
            <button
              class={classes('btn btn-primary', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
              onClick={async () => {
                await this.controllerForm.submit();
              }}
            >
              {this.scope.locale.Submit()}
            </button>
          )}
        </div>
      </div>
    );
  }

  private _renderManual() {
    return (
      <ZForm data={this.formData}>
        <input
          bs-demo-basic-formFieldLayout={{ label: `${this.scope.locale.YourName()}:` }}
          bs-formField={{
            name: 'name',
            validators: {
              onChange: z.string().min(3),
            },
            behaviorModel: true,
          }}
        ></input>
        <ZFormField
          name="name"
          slotDefault={props => {
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
        <button type="submit">Submit</button>
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
