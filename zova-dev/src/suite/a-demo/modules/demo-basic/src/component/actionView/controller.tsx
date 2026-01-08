import type { ITableCellRenderContext } from 'zova-module-a-table';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerActionViewProps {
  onClick?: () => void;
}

@Controller()
export class ControllerActionView extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$tableCell: ITableCellRenderContext;

  protected async __init__() {}

  protected render() {
    if (!this.$$tableCell) throw new Error('should used in table');
    const { $$table, cellContext, cellScope } = this.$$tableCell;
    return (
      <a
        class="hover:text-blue-500"
        href="#"
        onClick={e => {
          e.stopPropagation();
          $$table.onActionRow('view', cellContext.row);
        }}
      >
        {cellScope.displayValue}
      </a>
    );
  }
}
