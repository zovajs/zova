import type { IJsxRenderContextPageEntry } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerFormBase } from 'zova-module-a-form';
import { IResourceActionRowOptionsSubmit } from 'zova-module-basic-openapi';

export interface ControllerActionSubmitProps extends IResourceActionRowOptionsSubmit {}

@Controller()
export class ControllerActionSubmit extends BeanControllerBase {
  static $propsDefault = { class: 'btn btn-primary join-item' };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    const { $$pageEntry } = this.$$renderContext;
    const formInstance: BeanControllerFormBase = $$pageEntry.formInstance;
    const isSubmitting = formInstance?.formState.isSubmitting;
    const className = classes(this.$props.class, this.$style(this.$props.style));
    return (
      <>
        {isSubmitting && <span class="loading loading-spinner text-primary"></span>}
        <button
          class={classes(className, isSubmitting && 'btn-disabled')}
          type="submit"
          onClick={async () => {
            const res = await formInstance.submit();
            if (res) {
              this.$router.back();
            }
          }}
        >
          {this.scope.locale.Submit()}
        </button>
      </>
    );
  }
}
