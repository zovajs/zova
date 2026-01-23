import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsPageRoute extends IDecoratorModelOptions {}

@Model<IModelOptionsPageRoute>()
export class ModelPageRoute<PAGEDATA = unknown> extends BeanModelBase {
  protected _pageDataInner: any;
  public pageData: PAGEDATA;

  protected async __init__() {
    if (process.env.SERVER) {
      const pagePath = this.$ssr.context.pagePath;
      if (pagePath) {
        this._pageDataInner = this.getPageData(pagePath);
        this._pageDataInner = this.$ssr.context.pageData;
        this.pageData = this._pageDataInner;
      }
    } else {
      const route = this.$pageRoute!;
      this.pageData = this.getPageData(route.path);
    }
  }

  getPageData(pagePath: string): PAGEDATA {
    return this.$useStateMem({ queryKey: ['pageData', pagePath] });
  }
}
