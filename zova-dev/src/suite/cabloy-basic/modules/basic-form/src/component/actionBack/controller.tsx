import type { IJsxRenderContextPageEntry, IResourceActionRowPresetOptionsBase } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm } from 'zova-module-a-form';

export interface ControllerActionBackProps extends IResourceActionRowPresetOptionsBase {}

@Controller()
export class ControllerActionBack extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    const { $$pageEntry } = this.$$renderContext;
    const controllerForm: ControllerForm = $$pageEntry.controllerForm;
    const isSubmitting = controllerForm?.formState.isSubmitting;
    const className = this.$props.preset?.ActionBack?.class ?? 'btn btn-secondary join-item';
    return (
      <button
        class={classes(className, isSubmitting && 'btn-disabled')}
        onClick={() => {
          this.$router.back();
        }}
      >
        {this.scope.locale.Back()}
      </button>
    );
  }
}
