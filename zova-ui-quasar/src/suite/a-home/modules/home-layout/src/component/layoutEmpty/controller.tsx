import { QLayout, QPageContainer } from 'quasar';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZRouterViewEmpty } from 'zova-module-a-router';
import { ServiceLayoutEmptySsr } from './service.layoutEmptySsr.js';

export interface ControllerLayoutEmptyProps {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$ssr: ServiceLayoutEmptySsr;

  protected render() {
    return (
      <QLayout>
        <QPageContainer>
          <ZRouterViewEmpty></ZRouterViewEmpty>
        </QPageContainer>
      </QLayout>
    );
  }
}
