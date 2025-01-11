import { BeanApiBase, Api } from 'zova-module-a-api';

export interface ApiUserEntity {
  username?: string;
  avatar?: string;
}

@Api()
export class ApiUser extends BeanApiBase {
  getUserInfo() {
    return this.$fetch.get<any, ApiUserEntity>('/home/user/info');
  }
}
