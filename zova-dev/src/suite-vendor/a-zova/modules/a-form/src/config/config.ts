import type { ZovaSys } from 'zova';
import type { IFormProvider } from '../types/provider.js';

export const config = (_sys: ZovaSys) => {
  return {
    formProvider: {} as IFormProvider,
  };
};
