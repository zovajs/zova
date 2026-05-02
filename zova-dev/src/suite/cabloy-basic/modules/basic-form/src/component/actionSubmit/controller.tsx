import type { IJsxRenderContextPageEntry, IResourceActionRowPresetOptionsBase } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm } from 'zova-module-a-form';

export interface ControllerActionSubmitProps extends IResourceActionRowPresetOptionsBase {}

@Controller()
export class ControllerActionSubmit extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    const { $$pageEntry } = this.$$renderContext;
    const controllerForm: ControllerForm = $$pageEntry.controllerForm;
    const className = this.$props.preset?.ActionSubmit?.class ?? 'btn btn-primary join-item';
    return (
      <button
        class={classes(className, controllerForm?.formState.isSubmitting && 'btn-disabled')}
        onClick={async () => {
          const res = await controllerForm.submit();
          if (res) {
            this.$router.back();
          }
        }}
      >
        {this.scope.locale.Submit()}
      </button>
    );
  }
}
