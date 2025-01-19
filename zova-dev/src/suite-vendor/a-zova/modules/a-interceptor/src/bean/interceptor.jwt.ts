import { BeanInterceptorBase, IDecoratorInterceptorOptions, Interceptor } from 'zova-module-a-fetch';

export interface IInterceptorOptionsJwt extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsJwt>()
export class InterceptorJwt extends BeanInterceptorBase {}
