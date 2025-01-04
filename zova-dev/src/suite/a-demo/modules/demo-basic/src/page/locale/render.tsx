import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageLocale } from './controller.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderLocale extends ControllerPageLocale {}

@Local()
export class RenderLocale extends BeanRenderBase {
  public render() {
    return (
      <ZPage>
        <div>
          {this.app.meta.locale.current}: {this.scope.locale.HelloWorld()}
        </div>
        <button
          class="btn btn-primary"
          onClick={() => {
            if (this.app.meta.locale.current === 'en-us') {
              this.app.meta.locale.current = 'zh-cn';
            } else {
              this.app.meta.locale.current = 'en-us';
            }
          }}
        >
          {this.scope.locale.ChangeLanguage()}
        </button>
      </ZPage>
    );
  }
}
