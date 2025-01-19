import { BeanBase } from 'zova';
import { IDecoratorInterceptorOptions, Interceptor } from 'zova-module-a-fetch';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsBody>()
export class InterceptorBody extends BeanBase {}
