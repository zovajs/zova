import { VBtn, VInput, VTextField } from 'vuetify/components';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <VBtn color="secondary" onClick={() => this.increment()}>
          Increment
        </VBtn>
        <VBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </VBtn>
        <VInput label=""></VInput>
        <VTextField type=""></VTextField>
      </div>
    );
  }
}
