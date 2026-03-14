import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';

@Style()
export class StyleLayoutTabs extends BeanStyleBase {
  cMenuList: string;

  protected async __init__() {
    this.cMenuList = this.$style({
      backgroundColor: 'whitesmoke',
      display: 'flex',
      $nest: {
        a: {
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
        },
      },
    });
  }
}
