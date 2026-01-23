import type http from 'node:http';
import type { TypeSsrSitePerformAction } from 'zova-module-a-ssr';

import type { ServiceSsrHandler } from '../service/ssrHandler.js';
import 'zova';

export type TypeEventResolvePathResult = string | true | undefined;

export interface ISsrHandlerRenderOptionsInner {
  req: http.IncomingMessage;
  res: http.ServerResponse<http.IncomingMessage>;
  pagePathFull?: string;
  pagePath?: string;
  pageData?: any;
  performAction?: TypeSsrSitePerformAction;
}

declare module 'zova'{
  export interface SysMeta {
    $getSsrHandler(siteAssetDir: string): Promise<ServiceSsrHandler>;
  }
}
