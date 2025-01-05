import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerLayoutDefault } from './controller.js';

@Style()
export class StyleLayoutDefault extends BeanStyleBase {
  cTab: string;

  protected async __init__() {
    this.cTab = this.$style({
      $nest: {
        '&:hover .tab-close': {
          display: 'block',
        },
        '.tab-close': {
          position: 'absolute',
          top: '-6px',
          right: '-6px',
        },
      },
    });
  }
}
