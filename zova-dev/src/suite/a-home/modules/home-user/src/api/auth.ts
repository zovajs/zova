import { Api, BeanApiBase } from 'zova-module-a-api';
import { ApiUserEntity } from './user.js';

export interface ApiAuthJwt {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface ApiAuthLoginParams {
  username: string;
  password: string;
}

export interface ApiAuthLoginResult {
  user?: ApiUserEntity;
  jwt?: ApiAuthJwt;
}

@Api()
export class ApiAuth extends BeanApiBase {
  login(params: ApiAuthLoginParams) {
    return this.$fetch.post<any, ApiAuthLoginResult, ApiAuthLoginParams>('/home/user/login', params);
  }

  logout() {
    return this.$fetch.post<any, void, void>('/home/user/logout');
  }
}
