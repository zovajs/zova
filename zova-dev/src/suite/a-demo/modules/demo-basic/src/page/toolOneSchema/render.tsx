import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageToolOneSchema extends BeanRenderBase {
  public render() {
    const queryTest = this.$$modelTestSchema.testSchema();
    return <div>{queryTest.data?.name}</div>;
  }
}
