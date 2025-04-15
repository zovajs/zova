import type { ZovaSys } from 'zova';
import { cast } from 'zova';

export const ApiBaseURL = (sys: ZovaSys) => {
  return cast(sys.env).OPENAPI_BASE_URL_HOME_API || sys.env.OPENAPI_BASE_URL_DEFAULT;
};
