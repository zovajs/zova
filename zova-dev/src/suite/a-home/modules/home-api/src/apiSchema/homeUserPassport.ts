import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiHomeUserPassportassociatePath, ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, ApiApiHomeUserPassportcreateTempAuthTokenPath, ApiApiHomeUserPassportcurrentPath, ApiApiHomeUserPassportloginOauthPath, ApiApiHomeUserPassportloginPath, ApiApiHomeUserPassportlogoutPath, ApiApiHomeUserPassportmigratePath, ApiApiHomeUserPassportrefreshAuthTokenPath, ApiApiHomeUserPassportregisterPath } from '../api/homeUserPassport.js';

@ApiSchema()
export class ApiSchemaHomeUserPassport extends BeanBase {
  current(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcurrentPath, 'get', options);
  }

  logout(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportlogoutPath, 'post', options);
  }

  register(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportregisterPath, 'post', options);
  }

  login(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginPath, 'post', options);
  }

  loginOauth(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginOauthPath, 'get', options);
  }

  associate(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportassociatePath, 'get', options);
  }

  migrate(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportmigratePath, 'get', options);
  }

  refreshAuthToken(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportrefreshAuthTokenPath, 'post', options);
  }

  createPassportJwtFromOauthCode(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, 'post', options);
  }

  createTempAuthToken(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreateTempAuthTokenPath, 'post', options);
  }
}
