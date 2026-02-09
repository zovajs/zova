import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiHomeUserPassportassociatePath, ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, ApiApiHomeUserPassportcreateTempAuthTokenPath, ApiApiHomeUserPassportcurrentPath, ApiApiHomeUserPassportloginOauthPath, ApiApiHomeUserPassportloginPath, ApiApiHomeUserPassportlogoutPath, ApiApiHomeUserPassportmigratePath, ApiApiHomeUserPassportrefreshAuthTokenPath, ApiApiHomeUserPassportregisterPath } from '../api/homeUserPassport.js';

@ApiSchema()
export class ApiSchemaHomeUserPassport extends BeanBase {
  get current() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcurrentPath, 'get');
  }

  get logout() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportlogoutPath, 'post');
  }

  get register() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportregisterPath, 'post');
  }

  get login() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginPath, 'post');
  }

  get loginOauth() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginOauthPath, 'get');
  }

  get associate() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportassociatePath, 'get');
  }

  get migrate() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportmigratePath, 'get');
  }

  get refreshAuthToken() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportrefreshAuthTokenPath, 'post');
  }

  get createPassportJwtFromOauthCode() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, 'post');
  }

  get createTempAuthToken() {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreateTempAuthTokenPath, 'post');
  }
}
