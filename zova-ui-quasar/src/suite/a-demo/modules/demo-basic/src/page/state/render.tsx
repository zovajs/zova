import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerPageState } from './controller.js';
import { QBtn } from 'quasar';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <QBtn color="secondary" onClick={() => this.increment()}>
          Increment
        </QBtn>
        <QBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </QBtn>
      </div>
    );
  }
}
