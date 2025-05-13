import { FlexRender } from '@tanstack/vue-table';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestTable extends BeanRenderBase {
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
              <th></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  }
}
