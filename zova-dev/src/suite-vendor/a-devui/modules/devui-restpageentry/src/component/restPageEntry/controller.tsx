import type { ControllerPageEntry } from 'zova-module-rest-resource';
import { classes } from 'typestyle';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm } from 'zova-module-a-form';
import { ZPage } from 'zova-module-home-base';
import { ZWrapperForm } from '../../.metadata/index.js';

@Controller()
export class ControllerRestPageEntry extends BeanControllerBase {
  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restPageEntry: ControllerPageEntry;

  protected async __init__() {}

  protected render() {
    const { formMeta } = this.$$restPageEntry;
    return (
      <ZPage>
        <ZWrapperForm
          onControllerForm={ref => this.controllerForm = ref}
        ></ZWrapperForm>
        <div class="modal-action">
          {this.controllerForm?.formState.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
          {formMeta.formMode === 'edit' && (
            <button
              class={classes('btn btn-primary', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
              onClick={async () => {
                const res = await this.controllerForm.submit();
                if (res) {
                  this.$router.back();
                }
              }}
            >
              {this.scope.locale.Submit()}
            </button>
          )}
          <button
            class={classes('btn', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
            onClick={() => {
              this.$router.back();
            }}
          >
            {this.scope.locale.Back()}
          </button>
        </div>
      </ZPage>
    );
  }
}
