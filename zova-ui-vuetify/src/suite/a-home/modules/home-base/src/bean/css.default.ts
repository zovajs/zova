import { BeanBase } from 'zova';
import { Css } from 'zova-module-a-style';

@Css()
export class CssDefault extends BeanBase {
  textCenter: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
  }
}
