import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';

@Style()
export class StyleLayoutTabs extends BeanStyleBase {
  cTab: string;

  protected async __init__() {
    this.cTab = this.$style({
      $nest: {
        '.v-badge__badge': {
          display: 'none',
        },
        '&:hover .v-badge__badge': {
          display: 'block',
        },
      },
    });
  }
}
