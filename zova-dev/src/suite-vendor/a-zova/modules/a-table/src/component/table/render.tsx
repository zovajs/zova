import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderTable extends BeanRenderBase {
  private _renderTableDefault() {
    return <table></table>;
  }

  public render() {
    return this.$slotDefault
      ? this.$slotDefault()
      : this._renderTableDefault();
  }
}
