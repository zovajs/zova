import type { ComponentPublicInstance } from 'vue';
import type { IErrorObject } from './errorObject.js';

export const SymbolErrorInstanceInfo = Symbol('SymbolErrorInstanceInfo');

export interface IErrorInstanceInfo {
  instance?: ComponentPublicInstance | null;
  info?: string;
}

export interface IModuleError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeModuleErrors<T> = {
  [prop in string & keyof T]: IModuleError;
};

export type OnErrorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => void;

export interface ErrorSSR extends Error {
  url?: string;
}
