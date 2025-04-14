import { extend } from '@cabloy/extend';
import DeepEqual from 'deep-equal';
import { BeanSimple } from '../../bean/beanSimple.js';
import { uuid as _uuid } from '../../utils/uuid.js';

export class SysUtil extends BeanSimple {
  getApiBaseURL(useApiPrefix: boolean = true) {
    let baseURL = this.sys.config.api.baseURL || '';
    if (useApiPrefix) {
      baseURL = `${baseURL}${this.sys.config.api.prefix || ''}`;
    }
    return baseURL;
  }

  apiActionPathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return defaultPathSerializer(pathName, pathParams);
  }

  apiActionConfigPrepare(baseURL?: string, options?: any) {
    return Object.assign(
      {
        baseURL: baseURL || this.getApiBaseURL(false),
      },
      options,
      {
        params: options?.query,
        query: undefined,
      },
    );
  }

  public async resolveRoute(url: string) {
    // router
    const sysRouter = await this.sys.bean._getBean('a-router.sys.router' as never, false) as any;
    // resolve
    const matched = sysRouter.resolve(url);
    if (!matched || matched.name === '$:/:catchAll(.*)*') return undefined;
    return matched;
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
