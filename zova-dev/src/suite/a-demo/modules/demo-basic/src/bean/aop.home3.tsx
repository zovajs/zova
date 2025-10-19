import { BeanAopBase } from 'zova';
import { Aop, AopAction } from 'zova-module-a-bean';
import { ControllerPageHome } from 'zova-module-home-index';

@Aop({
  match: /home-index\.controller\.pageHome/,
  dependencies: 'demo-basic:home',
})
export class AopHome3 extends BeanAopBase {
  // @ts-ignore: ignore
  render: AopAction<ControllerPageHome, 'render'> = (_args, next, _receiver) => {
    const result = next();
    return <div class="aop-home-3">{result}</div>;
  };
}
