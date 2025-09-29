import type z from 'zod';
import type { ILocaleInfos } from '../bean/resource/locale/type.js';
import type { ZovaApplication } from '../core/app/application.js';
import { setLocaleAdapter, setLocaleErrors } from '@cabloy/zod-errors-custom';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { setParseAdapter } from '@cabloy/zod-query';

export type ZodLocaleError = () => { localeError: z.core.$ZodErrorMap };
export type ZodLocaleErrors = Record<keyof ILocaleInfos, ZodLocaleError>;

export function zodEnhance(app: ZovaApplication) {
  setLocaleAdapter((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}

export function zodEnhanceSys() {
  setParseAdapter(ZodMetadata);
}

export function zodSetLocaleErrors(app: ZovaApplication, localeErrors: ZodLocaleErrors, localeDefault?: string) {
  setLocaleErrors(() => {
    return app.meta.locale.current;
  }, localeErrors, localeDefault);
}
