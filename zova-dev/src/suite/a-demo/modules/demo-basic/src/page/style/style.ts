import { BeanStyleBase, useComputed } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerPageStyle } from './controller.js';

@Style()
export class StylePageStyle extends BeanStyleBase {
  cTextColor: string;
  cBlock: string;

  protected async __init__() {
    this.cTextColor = useComputed(() => {
      return this.$style({ color: this.active ? this.$token.color.primary : '' });
    });
    this.cBlock = useComputed(() => {
      return this.$style({
        padding: '8px',
      });
    });
  }
}
