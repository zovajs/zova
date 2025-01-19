import { BeanBase, cast, deepExtend, Use } from 'zova';
import { BeanOnion, IOnionItem, IOnionSlice, Service, TypeComposer } from 'zova-module-a-bean';
import { IDecoratorInterceptorOptions, IInterceptorRecord } from '../types/interceptor.js';
import { BeanInterceptorBase } from '../bean/bean.interceptorBase.js';
import { AxiosRequestConfig } from 'axios';

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
        const options = this._combineOnionOptions(config, onionSlice);
        // enable match ignore
        if (!this.$$beanOnion.checkOnionOptionsEnabled(options, config.url)) {
          return next(config);
        }
        const beanInstance = cast<BeanInterceptorBase>(onionSlice.beanInstance);
        return beanInstance.onRequest(config, next as any);
      },
    );
    this._composerRequestError = this.$$beanOnion.interceptor.compose(onionSlices, (onionSlice, error: any, next) => {
      const beanInstance = cast<BeanInterceptorBase>(onionSlice.beanInstance);
      return beanInstance.onRequestError(error, next as any);
    });
  }

  private _combineOnionOptions(
    config: AxiosRequestConfig,
    item: IOnionSlice<IDecoratorInterceptorOptions, keyof IInterceptorRecord>,
  ) {
    // options: dynamic
    let optionsDynamic;
    if (config.interceptorsDynamic) {
      optionsDynamic = config.interceptorsDynamic[item.name];
    }
    // final options
    const options = optionsDynamic ? deepExtend({}, item.options, optionsDynamic) : item.options;
    // ok
    return options;
  }
}
