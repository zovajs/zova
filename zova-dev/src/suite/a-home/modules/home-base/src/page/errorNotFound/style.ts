import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import { classes } from 'typestyle';

@Style()
export class StylePageErrorNotFound extends BeanStyleBase {
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
