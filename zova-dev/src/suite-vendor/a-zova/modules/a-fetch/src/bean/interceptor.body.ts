import { BeanBase } from 'zova';
import { Interceptor } from 'zova-module-a-fetch';

export interface IInterceptorOptionsBody extends IDecoratorBehaviorOptions {}

@Interceptor<IInterceptorOptionsBody>()
export class InterceptorBody extends BeanBase {}
