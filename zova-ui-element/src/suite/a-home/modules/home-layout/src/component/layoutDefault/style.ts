import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerLayoutDefault } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

@Style()
export class StyleLayoutDefault extends BeanStyleBase<ScopeModule> {
  cMainContainer: string;
  cMenuVerticalDemo: string;

  protected async __init__() {
    this.cMainContainer = this.$style({
      height: 'calc(100vh - 60px)',
    });
    this.cMenuVerticalDemo = this.$style({
      height: 'calc(100vh - 60px)',
    });
  }
}
