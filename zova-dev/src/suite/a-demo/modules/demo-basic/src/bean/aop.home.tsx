import { BeanBase } from 'zova';
import { Aop } from 'zova-module-a-bean';

@Aop({ match: 'home-index.controller.pageHome' })
export class AopHome extends BeanBase {
  render(_args, next) {
    const result = next();
    return <div class="aop-home">{result}</div>;
  }
}
