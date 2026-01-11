import { classes } from 'typestyle';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperForm, ZWrapperTable } from '../../.metadata/index.js';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    return (
      <div>
        <ClientOnly>
          {this._renderWrapperForm()}
        </ClientOnly>
        <ZWrapperTable
          tableProvider={this.tableProvider}
          onActionTable={action => this.onActionTable(action)}
          onActionRow={(action, row) => this.onActionRow(action, row)}
        ></ZWrapperTable>
      </div>
    );
  }

  private _renderWrapperForm() {
    return (
      <dialog id={this.formDomId} class="modal" open={this.formVisible} onClose={() => { this.formVisible = false; }}>
        <div class="modal-box">
          <h3 class="font-bold text-lg">{this.formSchema?.title}</h3>
          <p class="py-4">
            {this.formVisible && (
              <ZWrapperForm
                rowId={this.rowId}
                formMeta={this.formMeta}
                formProvider={this.formProvider}
                onControllerForm={ref => this.controllerForm = ref}
              ></ZWrapperForm>
            )}
          </p>
          <div class="modal-action">
            {this.controllerForm?.formState.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
            {this.formMeta.formMode === 'edit' && (
              <button
                class={classes('btn btn-primary', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
                onClick={async () => {
                  const res = await this.controllerForm.submit();
                  if (res) {
                    this.formVisible = false;
                  }
                }}
              >
                {this.scope.locale.Submit()}
              </button>
            )}
            <button
              class={classes('btn', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
              onClick={() => {
                this.formVisible = false;
              }}
            >
              {this.scope.locale.Close()}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
}
