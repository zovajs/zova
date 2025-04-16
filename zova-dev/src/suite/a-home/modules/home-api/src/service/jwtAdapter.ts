import type { IJwtAdapter, IJwtInfo } from 'zova-module-a-interceptor';
import { BeanBase, Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ModelPassport } from 'zova-module-home-user';

@Service()
export class ServiceJwtAdapter extends BeanBase implements IJwtAdapter {
  @Use()
  $$modelPassport: ModelPassport;

  protected async __init__() {}

  async getJwtInfo(): Promise<IJwtInfo | undefined> {
    return await this.$$modelPassport.getJwtInfo();
  }

  async refreshAuthToken(refreshToken: string): Promise<IJwtInfo> {
    return await this.$$modelPassport.refreshAuthToken(refreshToken);
  }
}
