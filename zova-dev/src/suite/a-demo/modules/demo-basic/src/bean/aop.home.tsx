import { BeanAopBase } from 'zova';
import { Aop } from 'zova-module-a-bean';
import { ControllerPageHome } from 'zova-module-home-index';

@Aop({ match: 'home-index.controller.pageHome' })
export class AopHome extends BeanAopBase {
  protected async __init__(
    _args: Parameters<ControllerPageHome['__init__']>,
    next: Function,
    receiver: ControllerPageHome,
  ) {
    await next();
    receiver.message += '!';
    Object.getPrototypeOf(receiver)['__dispose__'] = () => {};
  }

  protected __dispose__(_args: [], next: Function, receiver: ControllerPageHome) {
    receiver.message = receiver.message.substring(0, receiver.message.length - 1);
    next();
  }

  render(_args: [], next: Function) {
    const result = next();
    return <div class="aop-home">{result}</div>;
  }
}
