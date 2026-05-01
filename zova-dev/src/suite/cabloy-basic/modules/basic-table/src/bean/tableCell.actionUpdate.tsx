import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import {
  IDecoratorTableCellPresetOptions,
  IJsxRenderContextTableCell,
  IJsxRenderContextTableColumn,
  ITableCellRender,
  NextTableCellRender,
  TableCell,
} from 'zova-module-a-table';

export interface ITableCellOptionsActionUpdate extends IDecoratorTableCellPresetOptions {}

@TableCell<ITableCellOptionsActionUpdate>()
export class TableCellActionUpdate extends BeanBase implements ITableCellRender {
  async checkVisible(_options: ITableCellOptionsActionUpdate, _renderContext: IJsxRenderContextTableColumn): Promise<boolean> {
    return true;
  }

  render(options: ITableCellOptionsActionUpdate, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    return (
      <button
        class={options.preset?.actionUpdate?.class ?? 'btn btn-outline btn-primary join-item'}
        onClick={async () => {
          const actionName = $jsx.normalizeAction('actionEdit');
          await $host.$performAction(actionName, options.preset?.actionUpdate, renderContext);
        }}
      >
        <ZIcon name="::draft" width={24}></ZIcon>
      </button>
    );
  }
}
