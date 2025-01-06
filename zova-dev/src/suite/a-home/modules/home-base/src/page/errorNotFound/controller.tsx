import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { RouterLink } from 'vue-router';
import { classes } from 'typestyle';

@Controller()
export class ControllerPageErrorNotFound extends BeanControllerPageBase {
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

  protected render() {
    return (
      <div class="text-center">
        <div>
          <div class={this.cTitle}>404</div>

          <div class={this.cDescription}>Oops. Nothing here...</div>

          <RouterLink to="/">Go Home</RouterLink>
        </div>
      </div>
    );
  }
}
