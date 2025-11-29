import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperFilter } from '../../.metadata/index.js';
import { RenderCreate } from './render.create.jsx';
import { RenderPaged } from './render.paged.jsx';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  @Use()
  $$renderCreate: RenderCreate;

  @Use()
  $$renderPaged: RenderPaged;

  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$beanResource.componentTable);
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
        <ComponentTable
          table={this.table}
        ></ComponentTable>
        <div>
          {this.$$renderPaged.render()}
        </div>
      </div>
    );
  }
}
