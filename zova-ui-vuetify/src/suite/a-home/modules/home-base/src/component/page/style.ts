import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';

@Style()
export class StylePage extends BeanStyleBase<ScopeModule> {
  cPage: string;

  protected async __init__() {
    this.cPage = this.$style({
      padding: '16px',
    });
  }
}
