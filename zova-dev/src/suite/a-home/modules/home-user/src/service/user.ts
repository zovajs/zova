import { Service } from 'zova';
import { BeanServiceBase } from 'zova-module-a-api';

export interface ServiceUserEntity {
  username?: string;
  avatar?: string;
}

@Service()
export class ServiceUser extends BeanServiceBase {
  getUserInfo() {
    return this.$api.get<any, ServiceUserEntity>('/home/user/info');
  }
}
