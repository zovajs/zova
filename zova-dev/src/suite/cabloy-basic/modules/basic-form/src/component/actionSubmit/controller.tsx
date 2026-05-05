import type { IJsxRenderContextPageEntry } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, cast, IComponentOptions, Use } from 'zova';
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
          onClick={async (e: Event) => {
            this.onClick(e);
          }}
        >
          {this.scope.locale.Submit()}
        </button>
      </>
    );
  }

  private async onClick(e: Event) {
    const { $jsx, $host, $$pageEntry } = this.$$renderContext;
    const formInstance: BeanControllerFormBase = $$pageEntry.formInstance;
    const res = await formInstance.submit();
    if (!res) return;
    const pointerType = cast<PointerEvent>(e).pointerType;
    if (pointerType) {
      // back
      this.$router.back();
      return;
    }
    // replace edit page
    const actionName = $jsx.normalizeAction('ActionEdit');
    await $host.$performAction(
      actionName,
      {
        replace: true,
        resource: $$pageEntry.resource,
        id: $$pageEntry.entryIdCreated,
      },
      this.$$renderContext,
    );
  }
}
