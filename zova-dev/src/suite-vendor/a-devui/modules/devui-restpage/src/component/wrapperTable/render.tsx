import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperFilter } from '../../.metadata/index.js';
import { RenderCreate } from './render.create.jsx';
import { RenderPaged } from './render.paged.jsx';
import { RenderTable } from './render.table.jsx';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  @Use()
  $$renderTable: RenderTable;

  @Use()
  $$renderCreate: RenderCreate;

  @Use()
  $$renderPaged: RenderPaged;

  public render() {
    return (
      <div>
        <ZWrapperFilter
          formData={this.queryFilterData}
          onFilter={data => {
            this._onFilter(data);
          }}
        ></ZWrapperFilter>
        <div>
          {this.$$renderCreate.render()}
        </div>
        {this.$$renderTable.render()}
        <div>
          {this.$$renderPaged.render()}
        </div>
      </div>
    );
  }
}
