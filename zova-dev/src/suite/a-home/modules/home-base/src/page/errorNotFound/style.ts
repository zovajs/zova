import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerPageErrorNotFound } from './controller.js';
import { classes } from 'typestyle';

@Style()
export class StyleErrorNotFound extends BeanStyleBase {
  cTitle: string;
  cDescription: string;

  protected async __init__() {
    this.cTitle = this.$style({
      fontSize: '30vh',
    });
    this.cDescription = classes(
      'text-3xl',
      this.$style({
        opacity: '0.4',
      }),
    );
  }
}
