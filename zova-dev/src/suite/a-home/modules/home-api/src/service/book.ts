import { ZovaApplication } from 'zova';

export interface ServiceBookEchoResult {
  message: string;
}

export default (app: ZovaApplication) => {
  return {
    echo: () => app.meta.$api.get<any, ServiceBookEchoResult>('/book/echo'),
  };
};
