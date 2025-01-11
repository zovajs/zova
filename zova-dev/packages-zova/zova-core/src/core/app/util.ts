import { extend } from '@cabloy/extend';
import { BeanSimple } from '../../bean/beanSimple.js';
import { uuid as _uuid } from '../../utils/uuid.js';

export class AppUtil extends BeanSimple {
  getApiBaseURL(useApiPrefix: boolean = true) {
    let baseURL;
    if (process.env.SERVER) {
      baseURL = process.env.SSR_API_BASE_URL;
    } else {
      baseURL = this.app.config.api.baseURL || '';
    }
    if (useApiPrefix) {
      baseURL = `${baseURL}${this.app.config.api.prefix || ''}`;
    }
    return baseURL;
  }

  apiActionPathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return defaultPathSerializer(pathName, pathParams);
  }

  apiActionConfigPrepare(baseURL?: string, options?: any) {
    return {
      baseURL: baseURL || this.getApiBaseURL(false),
      params: options?.query,
      headers: options?.headers,
    };
  }
}

const PATH_PARAM_RE = /\{([^{}\/]+)\}/g;
export function defaultPathSerializer(pathName: string, pathParams?: Record<string, any>): string {
  if (!pathParams) return pathName;
  return pathName.replace(PATH_PARAM_RE, (_, _part) => {
    const value = pathParams?.[_part];
    if (value === undefined || value === null) return `{${_part}}`;
    if (typeof value === 'object') return encodeURIComponent(JSON.stringify(value));
    return encodeURIComponent(value);
  });
}

export function uuid(): string {
  return _uuid();
}

export function isUuid(str: string): boolean {
  if (!str) return false;
  const length = str.length;
  return length === 36 || length === 32;
}

export function deepExtend<T = any>(...args): T {
  return extend(true, ...args);
}
