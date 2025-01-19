import { BeanBase, Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { IJwtAdapter } from 'zova-module-a-interceptor';
import { ModelAuth } from 'zova-module-home-user';

@Service()
export class ServiceJwtAdapter extends BeanBase implements IJwtAdapter {
  @Use()
  $$modelAuth: ModelAuth;

  protected async __init__() {}

  async getAuthorization(): Promise<string | undefined> {
    return this.$$modelAuth.jwtAuthorization;
  }
}
