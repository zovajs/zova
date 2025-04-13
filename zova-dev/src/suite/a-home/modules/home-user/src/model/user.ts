import type { ApiUserEntity } from '../api/user.js';
import { Use } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ModelAuth } from 'zova-module-home-user';

@Model()
export class ModelUser extends BeanModelBase {
  user?: ApiUserEntity;
  @Use()
  $$modelAuth: ModelAuth;

  protected async __init__() {
    if (process.env.CLIENT) {
      this.user = this.$useQueryLocal({
        queryKey: ['user'],
      });
    } else {
      this.user = undefined;
    }
  }

  async ensureUser() {
    if (process.env.CLIENT) return this.user;
    if (!this.user && this.$$modelAuth.isAuthenticated) {
      const queryUser = this.getUserInfo();
      await queryUser.suspense();
      if (queryUser.isError) {
        if (process.env.DEV) {
          console.error(queryUser.error);
        }
        this.$ssr.redirect('/login');
      }
      this.user = queryUser.data;
    }
    return this.user;
  }

  getUserInfo() {
    return this.$useStateData({
      queryKey: ['user'],
      queryFn: async () => {
        return await this.scope.api.user.getUserInfo();
      },
    });
  }
}
