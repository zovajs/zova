import { VBtn } from 'vuetify/components/VBtn';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <VBtn color="secondary" nativeOnClick={() => this.increment()}>
          Increment
        </VBtn>
        <VBtn color="secondary" nativeOnClick={() => this.decrement()}>
          Decrement
        </VBtn>
      </div>
    );
  }
}
