import type { DefaultOptions, StaleTime } from '@tanstack/vue-query';
import type { CookieOptions, ZovaSys } from 'zova';
import type { MaxAgeTime } from '../types/index.js';
import { defaultShouldDehydrateQuery } from '@tanstack/vue-query';

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    gcTime: 1000 * 60 * 5,
  },
  dehydrate: {
    shouldDehydrateQuery(query) {
      if (query.meta?.ssr?.dehydrate === false) return false;
      // mem query return true, because mem persister is false
      if (typeof query.meta?.persister === 'object' && query.meta?.persister?.sync) return false;
      return defaultShouldDehydrateQuery(query);
    },
    shouldDehydrateMutation(_mutation) {
      return false;
    },
  },
};

export const config = (_sys: ZovaSys) => {
  return {
    persister: {
      maxAge: {
        cookie: undefined as MaxAgeTime | undefined, // undefined: session cookie
        local: Infinity as MaxAgeTime,
        db: (1000 * 60 * 60 * 24) as number, // 24 hours
      },
      cookie: {
        options: {} as Omit<CookieOptions, 'expires'>,
      },
    },
    query: {
      staleTime: {
        async: 0 as StaleTime,
        ssr: Infinity as StaleTime,
      },
    },
    queryClientConfig: {
      defaultOptions,
    },
  };
};
