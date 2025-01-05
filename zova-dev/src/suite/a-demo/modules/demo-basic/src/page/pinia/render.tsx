import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StylePinia } from './style.js';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderPagePinia extends BeanRenderBase {
  public render() {
    return (
      <ZPage>
        <div>{`count: ${this.$$counter.count}`}</div>
        <div>{`doubleCount: ${this.$$counter.doubleCount}`}</div>
        <div>{`name: ${this.$$counter.name}`}</div>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.$$counter.increment();
          }}
        >
          Increment
        </button>
      </ZPage>
    );
  }
}
