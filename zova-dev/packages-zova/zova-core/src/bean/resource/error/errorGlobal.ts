import type { TypeScopesErrorCodes } from '../../type.js';

declare global {
  export interface Error {
    code?: TypeScopesErrorCodes | number | undefined;
    status?: number | string | undefined;
  }
}
export {};
