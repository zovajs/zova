import type http from 'node:http';
import type { TypeSsrSitePerformAction } from 'zova';

export type TypeEventResolvePathResult = string | true | undefined;

export interface ISsrHandlerRenderOptionsInner {
  req: http.IncomingMessage;
  res: http.ServerResponse<http.IncomingMessage>;
  pagePath?: string;
  pageData?: any;
  performAction?: TypeSsrSitePerformAction;
}
