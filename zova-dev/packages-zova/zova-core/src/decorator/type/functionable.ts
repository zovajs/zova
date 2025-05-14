export type Functionable<T = void> = (...args: any[]) => T;
export type FunctionAsync<RESULT = void> = () => Promise<RESULT>;
export type Next = (data?: any) => Promise<any>;
export type NextSync = (data?: any) => any;
export type NextGeneral = (data?: any) => Promise<any> | any;
