import { QLayout, QPageContainer } from 'quasar';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZRouterViewEmpty } from 'zova-module-a-router';
import { IServiceSsrOptions, ServiceSsr } from '../../service/ssr.js';

export interface ControllerLayoutEmptyProps {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ init: { arg: { sidebarLeftOpenPC: false } as IServiceSsrOptions } })
  $$ssr: ServiceSsr;

  protected render() {
    return (
      <QLayout>
        <QPageContainer>
          <ZRouterViewEmpty></ZRouterViewEmpty>
        </QPageContainer>
        <div class="__ssr_placeholder__"></div>
      </QLayout>
    );
  }
}
