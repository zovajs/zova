import type { TypeAuthToken } from '../../types/utils/auth.js';
import { extend } from '@cabloy/extend';
import DeepEqual from 'deep-equal';
import { BeanSimple } from '../../bean/beanSimple.js';
import { uuid as _uuid } from '../../utils/uuid.js';

export class SysUtil extends BeanSimple {
  getAbsolutePagePath(path?: string) {
    let prefix = process.env.DEV ? `http://${this.sys.env.DEV_SERVER_HOSTNAME || 'localhost'}:${this.sys.env.DEV_SERVER_PORT}` : `${this.sys.config.ssr.server.protocol}://${this.sys.config.ssr.server.host}`;
    if (this.sys.env.APP_PUBLIC_PATH) {
      prefix = `${prefix}/${this.sys.env.APP_PUBLIC_PATH}`;
    }
    return `${prefix}${path || ''}`;
  }

  getPagePathFromAbsoluteUrl(url: string) {
    const { pathname } = new URL(url);
    const prefix = this.sys.env.APP_PUBLIC_PATH ? `/${this.sys.env.APP_PUBLIC_PATH}` : '';
    if (pathname.startsWith(prefix)) {
      return pathname.substring(prefix.length);
    }
    return pathname;
  }

  getApiBaseURL(useApiPrefix: boolean = true) {
    let baseURL = this.sys.config.api.baseURL || '';
    if (useApiPrefix) {
      baseURL = `${baseURL}${this.sys.config.api.prefix || ''}`;
    }
    return baseURL;
  }

  getOpenApiBaseURL(envName: string): string {
    if (process.env.CLIENT) {
      return this.sys.env[envName] || this.sys.env.OPENAPI_BASE_URL_DEFAULT || this.sys.env.API_BASE_URL;
    } else {
      return this.sys.env[envName] || this.sys.env.OPENAPI_BASE_URL_DEFAULT || this.sys.env.SSR_API_BASE_URL;
    }
  }

  apiActionPathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return defaultPathSerializer(pathName, pathParams);
  }

  apiActionConfigPrepare(baseURL?: string, options?: any, authToken?: TypeAuthToken) {
    const optionsCustom: any = {
      params: options?.query,
      query: undefined,
    };
    authToken = options?.authToken === undefined ? authToken : options?.authToken;
    if (authToken !== undefined) {
      optionsCustom.interceptors = { 'a-interceptor:jwt': { authToken } };
    }
    return deepExtend(
      {
        baseURL: baseURL || this.getApiBaseURL(false),
      },
      options,
      optionsCustom,
    );
  }

  public async resolveRoute(url: string, checkAliasOf?: boolean): Promise<any | undefined> {
    const sysRouter = await this.sys.bean._getBean('a-router.sys.router' as never, false) as any;
    return await sysRouter.resolveRoute(url, checkAliasOf);
  }
}

const PATH_PARAM_RE = /\{([^{}/]+)\}/g;
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

export function deepEqual(actual: unknown, expected: unknown, opts?: { strict?: boolean }): boolean {
  return DeepEqual(actual, expected, opts);
}

export function disposeInstance(instance: any) {
  instance?.__dispose__?.();
}

export function polyfillDispose(instance: any) {
  if (!instance || instance.__dispose__) return;
  Object.getPrototypeOf(instance).__dispose__ = () => {};
}
