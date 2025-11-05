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
            vModel:formVisible={this.formVisible}
            formData={this.rowCurrent?.original}
            formMeta={this.formMeta}
            formProvider={this.formProvider}
            getMutationSubmit={() => {
              return this.getMutationSubmit();
            }}
          ></ZWrapperForm>
        </ClientOnly>
        <ZWrapperTable></ZWrapperTable>
      </div>
    );
  }
}
