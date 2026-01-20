import type { ControllerCard } from '../../.metadata/index.jsx';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';
import { ZCard } from '../../index.js';

@Controller()
export class ControllerPageComponent extends BeanControllerPageBase {
  resetTime: Date = new Date();
  cardRef?: ControllerCard;

  protected render() {
    return (
      <ZPage>
        <ZCard
          controllerRef={ref => {
            this.cardRef = ref;
            // eslint-disable-next-line
            console.log('cardRef.$props: ', this.cardRef?.$props);
          }}
          header="header"
          content={this.resetTime.toString()}
          footer="footer"
          onReset={time => {
            this.resetTime = time;
          }}
          slotHeader={() => {
            return <div>this is a header slot from parent</div>;
          }}
          slotFooter={() => {
            return <div>this is a footer slot from parent</div>;
          }}
        >
          <div>this is a default slot from parent</div>
        </ZCard>
        <label>Input: </label>
        <input
          bs-behaviors-focus
          type="text"
          class="input input-bordered w-full max-w-xs"
          value={this.resetTime.toString()}
        >
        </input>
      </ZPage>
    );
  }
}
