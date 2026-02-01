import { QLayout, QPageContainer } from 'quasar';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZRouterViewEmpty } from 'zova-module-a-router';

export interface ControllerLayoutEmptyProps {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};

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
