import { BeanStyleBase, useComputed } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerPageStyle } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

@Style()
export class StylePageStyle extends BeanStyleBase<ScopeModule> {
  cTextColor: string;

  protected async __init__() {
    this.cTextColor = useComputed(() => {
      return this.$style({ color: this.active ? this.$token.colors.primary : '' });
    });
  }
}
