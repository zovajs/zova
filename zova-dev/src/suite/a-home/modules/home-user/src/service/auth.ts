import { Service } from 'zova';
import { BeanServiceBase } from 'zova-module-a-api';
import { ServiceUserEntity } from './user.js';

export interface ServiceAuthJWT {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface ServiceAuthLoginParams {
  username: string;
  password: string;
}

export interface ServiceAuthLoginResult {
  user?: ServiceUserEntity;
  jwt?: ServiceAuthJWT;
}

@Service()
export class ServiceAuth extends BeanServiceBase {
  login(params: ServiceAuthLoginParams) {
    return this.$api.post<any, ServiceAuthLoginResult, ServiceAuthLoginParams>('/home/user/login', params);
  }

  logout() {
    return this.$api.post<any, void, void>('/home/user/logout');
  }
}
