import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiHomeUserPassportassociatePath, ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, ApiApiHomeUserPassportcreateTempAuthTokenPath, ApiApiHomeUserPassportcurrentPath, ApiApiHomeUserPassportloginOauthPath, ApiApiHomeUserPassportloginPath, ApiApiHomeUserPassportlogoutPath, ApiApiHomeUserPassportmigratePath, ApiApiHomeUserPassportrefreshAuthTokenPath, ApiApiHomeUserPassportregisterPath } from '../api/homeUserPassport.js';

@ApiSchema()
export class ApiSchemaHomeUserPassport extends BeanApiSchemaBase {
  get current() {
    return this.$createApiSchemas(ApiApiHomeUserPassportcurrentPath, 'get');
  }

  get logout() {
    return this.$createApiSchemas(ApiApiHomeUserPassportlogoutPath, 'post');
  }

  get register() {
    return this.$createApiSchemas(ApiApiHomeUserPassportregisterPath, 'post');
  }

  get login() {
    return this.$createApiSchemas(ApiApiHomeUserPassportloginPath, 'post');
  }

  get loginOauth() {
    return this.$createApiSchemas(ApiApiHomeUserPassportloginOauthPath, 'get');
  }

  get associate() {
    return this.$createApiSchemas(ApiApiHomeUserPassportassociatePath, 'get');
  }

  get migrate() {
    return this.$createApiSchemas(ApiApiHomeUserPassportmigratePath, 'get');
  }

  get refreshAuthToken() {
    return this.$createApiSchemas(ApiApiHomeUserPassportrefreshAuthTokenPath, 'post');
  }

  get createPassportJwtFromOauthCode() {
    return this.$createApiSchemas(ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, 'post');
  }

  get createTempAuthToken() {
    return this.$createApiSchemas(ApiApiHomeUserPassportcreateTempAuthTokenPath, 'post');
  }
}
