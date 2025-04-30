import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageToolOne extends BeanRenderBase {
  public render() {
    const queryTest = this.$$modelTest.test();
    const sdk = this.$$sysSdk.getSdk(this.$query.api, this.$query.apiMethod);
    return (
      <div>
        <div>{queryTest.data?.name}</div>
        <div>{Object.keys(sdk?.responses || {})}</div>
      </div>
    );
  }
}
