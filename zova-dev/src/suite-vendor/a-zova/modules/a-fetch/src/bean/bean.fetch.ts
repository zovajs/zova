import { BeanBase, deepExtend, Use } from 'zova';
import axios, { AxiosInstance } from 'axios';
import { markRaw } from 'vue';
import { ModelAuth } from 'zova-module-home-user';
import { Bean, BeanOnion, IOnionItem, IOnionSlice } from 'zova-module-a-bean';
import { IBeanFetchOptions, IDecoratorInterceptorOptions, IInterceptorRecord } from '../types/interceptor.js';

const SymbolFetch = Symbol('SymbolFetch');

export interface BeanFetch extends AxiosInstance {}

@Bean()
export class BeanFetch extends BeanBase {
  @Use()
  $$modelAuth: ModelAuth;
  @Use()
  $$beanOnion: BeanOnion;
  // private _composerRequest: TypeComposer;
  // private _composerRequestError: TypeComposer;
  // private _composerResponse: TypeComposer;
  // private _composerResponseError: TypeComposer;

  private [SymbolFetch]: AxiosInstance;

  protected async __init__(options?: IBeanFetchOptions) {
    // axiosConfig
    const axiosConfig = deepExtend(
      {},
      { baseURL: this.app.util.getApiBaseURL() },
      this.scope.config.axios.config,
      options?.axiosConfig,
    );
    // composer
    await this._createComposer(options?.onionItems);
    // axios
    this[SymbolFetch] = markRaw(axios.create(axiosConfig));
    this._addInterceptors(this[SymbolFetch]);
  }

  protected __get__(prop) {
    return this[SymbolFetch] && this[SymbolFetch][prop];
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
    // this._composerRequest = this.$$beanOnion.interceptor.compose(onionSlices, (onionSlice, config: any, next) => {
    //   const options = {};
    //   const beanInstance = cast<BeanInterceptorBase>(onionSlice.beanInstance);
    //   return beanInstance.onRequest(config, next as any);
    // });
    // this._composerRequestError = this.$$beanOnion.interceptor.compose(onionSlices, (onionSlice, error: any, next) => {
    //   const beanInstance = cast<BeanInterceptorBase>(onionSlice.beanInstance);
    //   return beanInstance.onRequestError(error, next as any);
    // });
  }

  private _addInterceptors(api: AxiosInstance) {
    // request
    api.interceptors.request.use(
      async config => {
        if (this.app.config.api.jwt) {
          config.headers.Authorization = `Bearer ${this.$$modelAuth.jwtAuthorization || ''}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // response
    api.interceptors.response.use(
      response => {
        const contentType = response.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') === -1) return response;
        if (response.data.code !== 0) {
          const error = new Error();
          error.code = response.data.code;
          error.message = response.data.message;
          return Promise.reject(error);
        }
        // return data
        return response.data.data;
      },
      error => {
        if (error.response) {
          error.code = (error.response.data && error.response.data.code) || error.response.status;
          error.message = (error.response.data && error.response.data.message) || error.response.statusText;
        }
        return Promise.reject(error);
      },
    );
  }
}
