import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperForm, ZWrapperTable } from '../../.metadata/index.js';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    return (
      <div>
        <ClientOnly>
          <ZWrapperForm
            formMeta={this.formMeta}
            controllerRef={ref => {
              this.wrapperFormRef = ref;
            }}
          ></ZWrapperForm>
        </ClientOnly>
        <ZWrapperTable onOperationCreate={() => this.onOperationCreate()}></ZWrapperTable>
      </div>
    );
  }
}
