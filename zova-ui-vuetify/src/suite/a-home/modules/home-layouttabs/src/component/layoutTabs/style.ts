import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';

@Style()
export class StyleLayoutTabs extends BeanStyleBase {
  cTab: string;

  protected async __init__() {
    this.cTab = this.$style({
      $nest: {
        '.close': {
          display: 'none',
          position: 'absolute',
          top: '2px',
          right: '4px',
        },
        '&:hover .close': {
          display: 'block',
        },
      },
    });
  }
}
