import type {
  DefaultError,
  Query,
  QueryClient,
  QueryKey,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  UseQueryReturnType,
} from '@tanstack/vue-query';
import type { UnwrapNestedRefs } from 'vue';
import type { DefinedInitialQueryOptions, TypeStateType, UndefinedInitialQueryOptions } from '../../common/types.js';
import {
  hashKey,
} from '@tanstack/vue-query';
import { deepExtend, useCustomRef } from 'zova';
import { BeanModelUseQuery } from './bean.model.useQuery.js';
import { BeanModelUseState } from './bean.model.useState.js';

export class BeanModelUseStateGeneral extends BeanModelUseState {
  $useState<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(stateType: 'local', options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useState<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(stateType: 'local', options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useState<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(stateType: 'local', options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
}
