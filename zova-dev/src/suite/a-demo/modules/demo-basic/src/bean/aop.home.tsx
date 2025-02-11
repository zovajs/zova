import { BeanBase } from 'zova';
import { Aop } from 'zova-module-a-bean';

@Aop({ match: 'home-index.controller.pageHome' })
export class AopHome extends BeanBase {
  protected async __init__(_args, next) {
    const result = await next();
    return result + '!';
  }

  render(_args, next) {
    const result = next();
    return <div class="aop-home">{result}</div>;
  }
}
