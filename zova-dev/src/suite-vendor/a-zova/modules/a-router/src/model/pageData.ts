import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsPageData extends IDecoratorModelOptions {}

@Model<IModelOptionsPageData>()
export class ModelPageData<PAGEDATA = unknown> extends BeanModelBase {
  protected _pageDataInner: any;
  public current: PAGEDATA;

  protected async __init__() {
    if (process.env.SERVER) {
      const pagePath = this.$ssr.state.pagePath;
      if (pagePath) {
        this._pageDataInner = this.getPageData(pagePath);
        this._pageDataInner = this.$ssr.state.pageData;
        this.current = this._pageDataInner;
      }
    } else {
      const route = this.$pageRoute!;
      this.current = this.getPageData(route.path);
    }
  }

  getPageData(pagePath: string): PAGEDATA {
    return this.$useStateMem({ queryKey: ['pageData', pagePath] });
  }
}
