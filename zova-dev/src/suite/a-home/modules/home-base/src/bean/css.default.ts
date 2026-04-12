import type { IDecoratorCssOptions } from 'zova-module-a-style';

import { BeanBase, useComputed } from 'zova';
import { Css } from 'zova-module-a-style';

export interface ICssOptionsDefault extends IDecoratorCssOptions {}

@Css<ICssOptionsDefault>()
export class CssDefault extends BeanBase {
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
