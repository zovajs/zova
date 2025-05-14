export type Functionable<T = unknown> = (...args: any[]) => T;
export type FunctionAsync<RESULT = unknown> = () => Promise<RESULT>;
export type Next = (data?: any) => Promise<any>;
export type NextSync = (data?: any) => any;
export type NextGeneral = (data?: any) => Promise<any> | any;
