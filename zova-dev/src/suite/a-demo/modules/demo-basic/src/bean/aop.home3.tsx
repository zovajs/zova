import { BeanAopBase, NextSync } from 'zova';
import { Aop } from 'zova-module-a-bean';

@Aop({
  match: /home-index\.controller\.pageHome/,
  dependencies: 'demo-basic:home',
})
export class AopHome3 extends BeanAopBase {
  render(_args: [], next: NextSync) {
    const result = next();
    return <div class="aop-home-3">{result}</div>;
  }
}
