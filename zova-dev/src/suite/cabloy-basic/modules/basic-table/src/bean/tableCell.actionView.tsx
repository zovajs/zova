import { BeanBase } from 'zova';
import { IDecoratorTableCellPresetOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellPresetOptions {}

@TableCell<ITableCellOptionsActionView>()
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    const value = next();
    return (
      <a
        class={options.preset?.ActionView?.class ?? 'hover:text-blue-500'}
        href="#"
        onClick={async e => {
          e.preventDefault();
          e.stopPropagation();
          const actionName = $jsx.normalizeAction('actionView');
          await $host.$performAction(actionName, options.preset?.ActionView, renderContext);
        }}
      >
        {value}
      </a>
    );
  }
}
