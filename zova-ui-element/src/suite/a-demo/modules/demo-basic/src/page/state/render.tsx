import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerPageState } from './controller.js';
import { ElButton } from 'element-plus';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <ElButton onClick={() => this.increment()}>Increment</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}
