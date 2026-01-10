import { BeanBase, Use, usePrepareArg } from "zova";
import { ApiSchema } from "zova-module-a-api";
import { getSchemaNameOfRequestBody, ModelSdk } from "zova-module-a-openapi";
import { ApiApiCaptchacreatePath } from "../api/captcha.js";

@ApiSchema()
export class ApiSchemaCaptcha extends BeanBase {
  @Use({ beanFullName: 'a-openapi.model.sdk' })
  get $$modelSdk(): ModelSdk {
    return usePrepareArg(
      this.app.meta.locale.current,
      true,
    );
  }
  
  get create() {
    const querySdk= this.$$modelSdk.getSdk(ApiApiCaptchacreatePath,'post');
    const schemaName=getSchemaNameOfRequestBody(querySdk?.data?.operationObject);
    if(!schemaName) return;
    return this.$$modelSdk.getSchema(schemaName)
  }
}