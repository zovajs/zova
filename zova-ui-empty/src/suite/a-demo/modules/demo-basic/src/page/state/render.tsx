import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <ZPage>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </ZPage>
    );
  }
}
