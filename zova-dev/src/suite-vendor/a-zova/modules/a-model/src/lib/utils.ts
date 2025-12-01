import type { DataQuery } from '../types/query.js';

export type TypeQueryAutoLoadFn<T> = () => DataQuery<T> | undefined;

export async function $QueryAutoLoad<T = any>(fn: TypeQueryAutoLoadFn<T>) {
  const query = fn();
  if (query && query.data === undefined) {
    await query.suspense();
  }
  return query;
}
