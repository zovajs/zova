import { BeanInterceptorBase, IDecoratorInterceptorOptions, Interceptor } from 'zova-module-a-fetch';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsBody>()
export class InterceptorBody extends BeanInterceptorBase {}
