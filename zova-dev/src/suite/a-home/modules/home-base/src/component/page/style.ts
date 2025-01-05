import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';

@Style()
export class StylePage extends BeanStyleBase {
  cPage: string;

  protected async __init__() {
    this.cPage = this.$style({
      padding: '16px',
    });
  }
}
