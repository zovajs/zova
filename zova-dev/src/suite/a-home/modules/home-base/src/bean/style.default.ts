import { BeanBase, useComputed } from 'zova';
import { Style } from 'zova-module-a-style';

@Style()
export class StyleDefault extends BeanBase {
  textCenter: string;
  buttonPrimary: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
    this.buttonPrimary = useComputed(() => {
      return this.$style({
        color: this.$token.color.primary,
        borderColor: this.$token.var.borderColor,
      });
    });
  }
}
