import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiHomeUserPassportassociatePath, ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, ApiApiHomeUserPassportcreateTempAuthTokenPath, ApiApiHomeUserPassportcurrentPath, ApiApiHomeUserPassportloginOauthPath, ApiApiHomeUserPassportloginPath, ApiApiHomeUserPassportlogoutPath, ApiApiHomeUserPassportmigratePath, ApiApiHomeUserPassportrefreshAuthTokenPath, ApiApiHomeUserPassportregisterPath } from '../api/homeUserPassport.js';

@ApiMeta()
export class ApiMetaHomeUserPassport extends BeanBase {
  get current() {
    return [ApiApiHomeUserPassportcurrentPath, 'get'];
  }

  get logout() {
    return [ApiApiHomeUserPassportlogoutPath, 'post'];
  }

  get register() {
    return [ApiApiHomeUserPassportregisterPath, 'post'];
  }

  get login() {
    return [ApiApiHomeUserPassportloginPath, 'post'];
  }

  get loginOauth() {
    return [ApiApiHomeUserPassportloginOauthPath, 'get'];
  }

  get associate() {
    return [ApiApiHomeUserPassportassociatePath, 'get'];
  }

  get migrate() {
    return [ApiApiHomeUserPassportmigratePath, 'get'];
  }

  get refreshAuthToken() {
    return [ApiApiHomeUserPassportrefreshAuthTokenPath, 'post'];
  }

  get createPassportJwtFromOauthCode() {
    return [ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, 'post'];
  }

  get createTempAuthToken() {
    return [ApiApiHomeUserPassportcreateTempAuthTokenPath, 'post'];
  }
}
