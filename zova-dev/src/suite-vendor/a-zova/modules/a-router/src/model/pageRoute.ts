import { BeanModelBase, Model } from 'zova-module-a-model';

@Model()
export class ModelPageRoute extends BeanModelBase {
  pagePath?: string;
  pageData?: any;

  protected async __init__() {
    this.pagePath = this.$useStateMem({ queryKey: ['pagePath'] });
    this.pageData = this.$useStateMem({ queryKey: ['pageData', this.pagePath] });
    if (process.env.SERVER) {
      this.pagePath = this.$ssr.context.pagePath;
      this.pageData = this.$ssr.context.pageData;
    }
  }
}
