import type { IJwtAdapter } from 'zova-module-a-interceptor';
import type { ModelAuth } from 'zova-module-home-user';
import { BeanBase, Use } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceJwtAdapter extends BeanBase implements IJwtAdapter {
  @Use()
  $$modelAuth: ModelAuth;

  protected async __init__() {}

  async getAuthorization(): Promise<string | undefined> {
    return this.$$modelAuth.jwtAuthorization;
  }
}
