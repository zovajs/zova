import type { DataQuery } from '../types/query.js';

export type TypeQueryAutoLoadFn = () => DataQuery<any> | undefined;

export async function $QueryAutoLoad(fn: TypeQueryAutoLoadFn) {
  const query = fn();
  if (query && query.data === undefined) {
    await query.suspense();
  }
  return query;
}
