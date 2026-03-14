import { RouterLink } from '@cabloy/vue-router';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerPageErrorNotFound extends BeanControllerPageBase {
  cTitle: string;
  cDescription: string;

  protected async __init__() {
    this.cTitle = this.$style({
      fontSize: '60px',
    });
    this.cDescription = this.$style({
      fontSize: '30px',
      lineHeight: '1',
      opacity: '0.4',
    });
  }

  protected render() {
    return (
      <div class="text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div style="font-size: 30px;line-height:2;opacity:.4">Oops. Nothing here...</div>

          <RouterLink to="/">Go Home</RouterLink>
        </div>
      </div>
    );
  }
}
