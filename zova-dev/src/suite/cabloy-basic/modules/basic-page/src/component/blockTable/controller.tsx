import type { IJsxRenderContextPage } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZTable } from 'zova-module-a-table';
import { IResourceBlockOptionsTable } from 'zova-module-basic-openapi';

export interface ControllerBlockTableProps extends IResourceBlockOptionsTable {}

@Controller()
export class ControllerBlockTable extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  protected render() {
    const { $$page } = this.$$renderContext;
    return (
      <ZTable
        class={classes(this.$props.class, this.$style(this.$props.style))}
        controllerRef={ref => {
          $$page.tableInstance = ref;
        }}
        data={$$page.data}
        schema={$$page.schemaRow}
        tableProvider={$$page.tableProvider}
        tableScope={$$page.jsxCelScope}
      ></ZTable>
    );
  }
}
