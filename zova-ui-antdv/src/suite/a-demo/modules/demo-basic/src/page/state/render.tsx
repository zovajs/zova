import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { Button } from 'ant-design-vue';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <Button onClick={() => this.increment()}>Increment</Button>
        <Button onClick={() => this.decrement()}>Decrement</Button>
      </div>
    );
  }
}
