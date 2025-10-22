import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { useRoute } from '@cabloy/vue-router';
import { useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsPageRoute extends IDecoratorModelOptions {}

@Model<IModelOptionsPageRoute>()
export class ModelPageRoute extends BeanModelBase {
  protected _pageDataInner: any;
  pagePath?: string;
  pageData?: any;

  protected async __init__() {
    this.pagePath = this.$useStateMem({ queryKey: ['pagePath'] });
    if (process.env.SERVER) {
      const pagePath = this.$ssr.context.pagePath;
      if (pagePath) {
        this.pagePath = pagePath;
        this._pageDataInner = this.getPageData(this.pagePath);
        this._pageDataInner = this.$ssr.context.pageData;
        this.pageData = this._pageDataInner;
      }
    } else {
      this._pageDataInner = this.getPageData(this.pagePath);
      this.pageData = useComputed(() => {
        const route = this.ctx.util.instanceScope(() => {
          return useRoute();
        });
        return this.getPageData(route.fullPath);
      });
    }
  }

  getPageData(pagePath: string) {
    return this.$useStateMem({ queryKey: ['pageData', pagePath] });
  }
}
