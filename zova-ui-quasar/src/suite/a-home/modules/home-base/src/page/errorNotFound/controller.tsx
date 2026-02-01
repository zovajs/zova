import { QBtn } from 'quasar';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerPageErrorNotFound extends BeanControllerPageBase {
  cTitle: string;
  cDescription: string;

  protected async __init__() {
    this.cTitle = this.$style({
      fontSize: '30vh',
    });
    this.cDescription = this.$style({
      fontSize: '30vh',
      lineHeight: '1',
      opacity: '0.4',
    });
  }

  protected render() {
    return (
      <div class="text-center q-pa-md">
        <div>
          <div class={this.cTitle}>404</div>

          <div class={this.cDescription}>Oops. Nothing here...</div>

          <QBtn class="q-mt-xl" outline unelevated to={this.sys.env.ROUTER_PAGE_HOME} label="Go Home" no-caps />
        </div>
      </div>
    );
  }
}
