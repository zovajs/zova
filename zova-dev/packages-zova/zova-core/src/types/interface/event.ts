import type { Next } from '../../decorator/type/functionable.js';

export type TypeEventOff = () => void;

export type TypeEventHandlersMap<KS extends keyof IEventRecord> = {
  [K in KS]: TypeEventHandlers<IEventRecord[K]['data'], IEventRecord[K]['result']>;
};

export type TypeEventHandlers<D = unknown, R = unknown> = TypeEventHandlerWrapper<D, R>[];

export interface TypeEventHandlerWrapper<D, R> {
  fn: TypeEventHandler<D, R> | undefined;
}

export interface TypeEventHandler<D, R> {
  (data: D, next: Next): Promise<R>;
}

export type NextEvent<D = unknown, R = unknown> = (data?: D) => Promise<R>;

export interface IEventRecord extends Record<string, { data: any; result: any }> {}
