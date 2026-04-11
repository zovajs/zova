import { VBtn } from 'vuetify/components';
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
      lineHeight: '2',
      opacity: '0.4',
    });
  }

  protected render() {
    return (
      <div class="text-center q-pa-md">
        <div>
          <div class={this.cTitle}>404</div>
          <div class={this.cDescription}>Oops. Nothing here...</div>
          <VBtn rounded elevation={12} ripple text="Go Home" to={this.sys.env.ROUTER_PAGE_HOME} />
        </div>
      </div>
    );
  }
}
