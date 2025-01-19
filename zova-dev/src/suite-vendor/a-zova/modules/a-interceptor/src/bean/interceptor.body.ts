import { AxiosResponse } from 'axios';
import {
  BeanInterceptorBase,
  IDecoratorInterceptorOptions,
  IInterceptorResponse,
  Interceptor,
  NextInterceptorResponse,
} from 'zova-module-a-fetch';

export interface IInterceptorOptionsBody extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsBody>()
export class InterceptorBody extends BeanInterceptorBase implements IInterceptorResponse {
  async onResponse(
    response: AxiosResponse,
    _options: IInterceptorOptionsBody,
    next: NextInterceptorResponse,
  ): Promise<AxiosResponse> {
    response = await next();
    const contentType = response.headers['content-type'];
    if (!contentType || contentType.indexOf('application/json') === -1) return response;
    if (response.data.code !== 0) {
      const error = new Error();
      error.code = response.data.code;
      error.message = response.data.message;
      throw error;
    }
    // return data
    return response.data.data;
  }
}
