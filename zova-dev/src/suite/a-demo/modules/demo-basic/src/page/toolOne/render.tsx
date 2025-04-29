import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageToolOne extends BeanRenderBase {
  public render() {
    const queryTest = this.$$modelTest.test();
    return (
      <div>
        <div>{queryTest.data?.name}</div>
        <div></div>
      </div>
    );
  }
}
