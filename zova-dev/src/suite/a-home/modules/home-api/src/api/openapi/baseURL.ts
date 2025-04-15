import type { ZovaSys } from 'zova';

export const ApiBaseURL = (sys: ZovaSys) => {
  return sys.env.OPENAPI_BASE_URL_HOME_API || sys.env.OPENAPI_BASE_URL_DEFAULT;
};
