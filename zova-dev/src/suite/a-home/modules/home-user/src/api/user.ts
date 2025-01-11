import { BeanServiceBase, Service } from 'zova-module-a-api';

export interface ServiceUserEntity {
  username?: string;
  avatar?: string;
}

@Service()
export class ServiceUser extends BeanServiceBase {
  getUserInfo() {
    return this.$fetch.get<any, ServiceUserEntity>('/home/user/info');
  }
}
