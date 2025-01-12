import { BeanBase } from 'zova';
import { Aop } from 'zova-module-a-bean';

@Aop({
  match: /home-index\.controller\.pageHome/,
  dependencies: 'demo-basic:home',
})
export class AopHome3 extends BeanBase {
  render(_args, next) {
    const result = next();
    return <div class="aop-home-3">{result}</div>;
  }
}
