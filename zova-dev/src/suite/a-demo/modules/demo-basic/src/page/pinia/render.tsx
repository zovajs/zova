import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { StylePinia } from './style.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderPinia extends StylePinia {}

@Local()
export class RenderPinia extends BeanRenderBase {
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
