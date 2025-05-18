import { FlexRender } from '@tanstack/vue-table';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderTable extends BeanRenderBase {
  public render() {
    return (
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              {this.table.getFlatHeaders().map(header => {
                return (
                  <th key={header.id}>
                    <FlexRender render={header.column.columnDef.header} props={header.getContext()}></FlexRender>
                  </th>
                );
              })}
              <th>{this.scope.locale.TableActions()}</th>
            </tr>
          </thead>
          <tbody>
            {this.table.getRowModel().rows.map(row => {
              return (
                <tr key={row.getValue('id')}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        <FlexRender render={cell.column.columnDef.cell} props={cell.getContext()}></FlexRender>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
