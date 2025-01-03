import { Bean, BeanBase, Use } from 'zova';
import axios, { AxiosInstance } from 'axios';
import { markRaw } from 'vue';
import { ModelAuth } from 'zova-module-home-user';

const SymbolApi = Symbol('SymbolApi');

export interface BeanApi extends AxiosInstance {}

@Bean()
export class BeanApi extends BeanBase {
  @Use()
  $$modelAuth: ModelAuth;

  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = this.app.util.getApiBaseURL();
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
    this._addInterceptors(this[SymbolApi]);
  }

  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }

  private _addInterceptors(api: AxiosInstance) {
    // request
    api.interceptors.request.use(
      config => {
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
