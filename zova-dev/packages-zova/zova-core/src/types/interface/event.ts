import { Next } from '../../decorator/type/functionable.js';

export type TypeEventOff = () => void;

export type TypeEventHandlersMap<KS extends keyof IEventRecord> = {
  [K in KS]: TypeEventHandlers<IEventRecord[K], IEventResultRecord[K]>;
};

export type TypeEventHandlers<D = unknown, R = unknown> = TypeEventHandlerWrapper<D, R>[];

export type TypeEventContext<D, R> = {
  data: D;
  result: R;
};

export type TypeEventHandlerWrapper<D, R> = {
  fn: TypeEventHandler<D, R> | undefined;
};

export type TypeEventHandler<D, R> = {
  (data: D, next: Next): Promise<R>;
};

export type NextEvent<D = unknown, R = unknown> = (data?: D) => Promise<R>;

export interface IEventRecord {}
export type TypeEventRecordKeys = keyof IEventRecord;

export interface IEventResultRecord {}
export type TypeEventResultRecordKeys = keyof IEventResultRecord;
