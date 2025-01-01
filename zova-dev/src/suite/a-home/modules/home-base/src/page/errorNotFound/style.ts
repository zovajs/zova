import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageErrorNotFound } from './controller.js';
import { classes } from 'typestyle';

export interface StyleErrorNotFound extends ControllerPageErrorNotFound {}

@Local()
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
