import type { AxiosInstance } from 'axios';
import type { IBeanFetchOptions } from '../types/interceptor.js';
import axios from 'axios';
import { markRaw } from 'vue';
import { BeanBase, deepExtend } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { ServiceComposer } from '../service/composer.js';

const SymbolFetch = Symbol('SymbolFetch');

export interface BeanFetch extends AxiosInstance {}

@Bean()
export class BeanFetch extends BeanBase {
  private _composer: ServiceComposer;

  protected [SymbolFetch]: AxiosInstance;

  protected async __init__(options?: IBeanFetchOptions) {
    // axiosConfig
    const axiosConfig = deepExtend(
      {},
      { baseURL: this.app.util.getApiBaseURL() },
      this.scope.config.axios.config,
      options?.axiosConfig,
    );
    // composer
    this._composer = await this.bean._newBean(ServiceComposer, true, this, options?.onionItems);
    // axios
    this[SymbolFetch] = markRaw(axios.create(axiosConfig));
    this._addInterceptors(this[SymbolFetch]);
  }

  protected __get__(prop) {
    return this[SymbolFetch] && this[SymbolFetch][prop];
  }

  private _addInterceptors(api: AxiosInstance) {
    // request
    api.interceptors.request.use(
      async config => {
        return await this._composer.executeRequest(config);
      },
      async _error => {
        const error = await this._composer.executeRequestError(_error);
        if (error instanceof Error) return Promise.reject(error);
        return error;
      },
    );
    // response
    api.interceptors.response.use(
      async response => {
        return await this._composer.executeResponse(response);
      },
      async _error => {
        const error = await this._composer.executeResponseError(_error);
        if (error instanceof Error) return Promise.reject(error);
        return error;
      },
    );
  }
}
