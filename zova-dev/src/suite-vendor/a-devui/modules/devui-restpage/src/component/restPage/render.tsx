import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperTable } from '../../.metadata/index.js';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    return (
      <div>
        <ZWrapperTable
          tableProvider={this.tableProvider}
          tableScope={this.tableScope}
        ></ZWrapperTable>
      </div>
    );
  }
}
