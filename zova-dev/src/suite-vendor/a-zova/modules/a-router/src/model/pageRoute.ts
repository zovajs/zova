import { useRoute } from '@cabloy/vue-router';
import { useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';

@Model()
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
      }
    } else {
      this._pageDataInner = this.getPageData(this.pagePath);
      const route = useRoute();
      this.pageData = useComputed(() => {
        return this.getPageData(route.fullPath);
      });
    }
  }

  getPageData(pagePath: string) {
    return this.$useStateMem({ queryKey: ['pageData', pagePath] });
  }
}
