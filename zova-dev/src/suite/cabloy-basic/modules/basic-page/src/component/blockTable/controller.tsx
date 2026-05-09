import type { IJsxRenderContextPage } from 'zova-module-a-openapi';

import { BeanControllerBase, deepEqual, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerTableBase, ZTable } from 'zova-module-a-table';
import { IResourceBlockOptionsTable } from 'zova-module-basic-openapi';

export interface ControllerBlockTableProps extends IResourceBlockOptionsTable {}

@Controller()
export class ControllerBlockTable extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  tableRef: BeanControllerTableBase;

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {
    // watch
    this.$watch(
      () => this.permissions,
      async (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        await this.tableRef?.refreshMeta();
      },
    );
  }

  get permissions() {
    return this.$$renderContext.$celScope.permissions;
  }

  protected render() {
    const { $$page } = this.$$renderContext;
    return (
      <ZTable
        class={this.$props.class}
        controllerRef={ref => {
          this.tableRef = ref;
          $$page.tableRef = ref;
        }}
        data={$$page.data}
        schema={$$page.schemaRow}
        tableProvider={$$page.tableProvider}
        tableScope={$$page.jsxCelScope}
      ></ZTable>
    );
  }
}
