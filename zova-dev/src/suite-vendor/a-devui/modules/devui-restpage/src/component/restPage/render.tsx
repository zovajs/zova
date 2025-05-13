import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    const ComponentRestTable = this.$zovaComponent(this.$$restResource.defaultRestTable);
    return (
      <div>
        <ComponentRestTable></ComponentRestTable>
      </div>
    );
  }
}
