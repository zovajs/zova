import type { Format } from './format.ts';

const LEVEL = Symbol('LEVEL');
const MESSAGE = Symbol('MESSAGE');
const SPLAT = Symbol('SPLAT');

export interface TransformableInfo {
  level: string;
  message: unknown;
  [LEVEL]?: string;
  [MESSAGE]?: unknown;
  [SPLAT]?: unknown;
  [key: string | symbol]: unknown;
}

export type TransformFunction = (info: TransformableInfo, opts?: unknown) => TransformableInfo | boolean;
export type FormatWrap = (opts?: object) => Format;

export enum NpmConfigSetLevels {
  error = 0,
  warn = 1,
  info = 2,
  http = 3,
  verbose = 4,
  debug = 5,
  silly = 6,
};

export type LoggerLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
