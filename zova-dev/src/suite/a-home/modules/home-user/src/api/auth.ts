import { Api, BeanApiBase } from 'zova-module-a-api';
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

@Api()
export class ServiceAuth extends BeanApiBase {
  login(params: ServiceAuthLoginParams) {
    return this.$fetch.post<any, ServiceAuthLoginResult, ServiceAuthLoginParams>('/home/user/login', params);
  }

  logout() {
    return this.$fetch.post<any, void, void>('/home/user/logout');
  }
}
