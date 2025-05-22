import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { RenderCreate } from './render.create.jsx';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  @Use()
  $$renderCreate: RenderCreate;

  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$restResource.componentTable);
    return (
      <div>
        <div>
          {this.$$renderCreate.render()}
        </div>
        <ComponentTable
          table={this.table}
        ></ComponentTable>
      </div>
    );
  }
}
