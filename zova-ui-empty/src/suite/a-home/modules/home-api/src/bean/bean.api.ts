import axios, { AxiosInstance } from 'axios';
import { markRaw } from 'vue';
import { Bean, BeanBase } from 'zova';

const SymbolFetch = Symbol('SymbolFetch');

export interface BeanFetch extends AxiosInstance {}

@Bean()
export class BeanFetch extends BeanBase {
  private [SymbolFetch]: AxiosInstance;

  protected async __init__() {
    const baseURL = this.app.util.getApiBaseURL();
    this[SymbolFetch] = markRaw(axios.create({ baseURL }));
    this._addInterceptors(this[SymbolFetch]);
  }

  protected __get__(prop: string) {
    return this[SymbolFetch] && this[SymbolFetch][prop];
  }

  private _addInterceptors(api: AxiosInstance) {
    // request
    api.interceptors.request.use(
      config => {
        if (this.sys.config.api.jwt) {
          config.headers.Authorization = 'Bearer ';
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
        if (!contentType || !contentType.includes('application/json')) return response;
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
