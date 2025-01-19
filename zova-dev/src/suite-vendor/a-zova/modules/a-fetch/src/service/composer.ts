import { BeanBase, cast, deepExtend, Use } from 'zova';
import { BeanOnion, IOnionItem, IOnionSlice, Service, TypeComposer } from 'zova-module-a-bean';
import {
  IDecoratorInterceptorOptions,
  IInterceptorRecord,
  IInterceptorRequest,
  IInterceptorRequestError,
  IInterceptorResponse,
  IInterceptorResponseError,
} from '../types/interceptor.js';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

@Service()
export class ServiceComposer extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  private _composerRequest: TypeComposer;
  private _composerRequestError: TypeComposer;
  private _composerResponse: TypeComposer;
  private _composerResponseError: TypeComposer;

  protected async __init__(
    onionItems?:
      | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>
      | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>[],
  ) {
    await this._createComposer(onionItems);
  }

  public executeRequest(config: AxiosRequestConfig) {
    return this._composerRequest(config);
  }

  public executeRequestError(error: AxiosError) {
    return this._composerRequestError(error);
  }

  public executeResponse(response: AxiosResponse) {
    return this._composerResponse(response);
  }

  public executeResponseError(error: AxiosError) {
    return this._composerResponseError(error);
  }

  private async _createComposer(
    onionItems?:
      | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>
      | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>[],
  ) {
    // onionSlices
    let onionSlices: IOnionSlice<IDecoratorInterceptorOptions, keyof IInterceptorRecord>[];
    if (onionItems) {
      onionSlices = await this.$$beanOnion.interceptor.loadOnions(onionItems);
    } else {
      onionSlices = await this.$$beanOnion.interceptor.loadOnionsFromPackage();
    }
    // create interceptors
    for (const onionSlice of onionSlices) {
      onionSlice.beanInstance = await this.bean._newBean(onionSlice.beanFullName as any, true, this);
    }
    // compose
    this._composerRequest = this.$$beanOnion.interceptor.compose(
      onionSlices,
      (onionSlice, config: AxiosRequestConfig, next) => {
        // options
        const options = this._combineOnionOptions(onionSlice, config);
        // enable match ignore
        if (!this.$$beanOnion.checkOnionOptionsEnabled(options, config.url)) {
          return next(config);
        }
        // execute
        const beanInstance = cast<IInterceptorRequest>(onionSlice.beanInstance);
        if (!beanInstance.onRequest) return next(config);
        return beanInstance.onRequest(config, options, next as any);
      },
    );
    this._composerRequestError = this.$$beanOnion.interceptor.compose(
      onionSlices,
      (onionSlice, error: AxiosError, next) => {
        const config = error.config;
        // options
        const options = this._combineOnionOptions(onionSlice, config);
        // enable match ignore
        if (!this.$$beanOnion.checkOnionOptionsEnabled(options, config?.url)) {
          return next(error);
        }
        // execute
        const beanInstance = cast<IInterceptorRequestError>(onionSlice.beanInstance);
        if (!beanInstance.onRequestError) return next(error);
        return beanInstance.onRequestError(error, options, next as any);
      },
    );
    this._composerResponse = this.$$beanOnion.interceptor.compose(
      onionSlices,
      (onionSlice, response: AxiosResponse, next) => {
        const config = response.config;
        // options
        const options = this._combineOnionOptions(onionSlice, config);
        // enable match ignore
        if (!this.$$beanOnion.checkOnionOptionsEnabled(options, config?.url)) {
          return next(response);
        }
        // execute
        const beanInstance = cast<IInterceptorResponse>(onionSlice.beanInstance);
        if (!beanInstance.onResponse) return next(response);
        return beanInstance.onResponse(response, options, next as any);
      },
    );
    this._composerResponseError = this.$$beanOnion.interceptor.compose(
      onionSlices,
      (onionSlice, error: AxiosError, next) => {
        const config = error.config;
        // options
        const options = this._combineOnionOptions(onionSlice, config);
        // enable match ignore
        if (!this.$$beanOnion.checkOnionOptionsEnabled(options, config?.url)) {
          return next(error);
        }
        // execute
        const beanInstance = cast<IInterceptorResponseError>(onionSlice.beanInstance);
        if (!beanInstance.onResponseError) return next(error);
        return beanInstance.onResponseError(error, options, next as any);
      },
    );
  }

  private _combineOnionOptions(
    item: IOnionSlice<IDecoratorInterceptorOptions, keyof IInterceptorRecord>,
    config?: AxiosRequestConfig,
  ) {
    // options: dynamic
    let optionsDynamic;
    if (config?.interceptorsDynamic) {
      optionsDynamic = config?.interceptorsDynamic[item.name];
    }
    // final options
    const options = optionsDynamic ? deepExtend({}, item.options, optionsDynamic) : item.options;
    // ok
    return options;
  }
}
