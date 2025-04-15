import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiApiHomeUserPassportloginResponseBody, ApiApiHomeUserPassportloginSimpleRequestBody } from 'zova-module-home-api';

@Model()
export class ModelPassport extends BeanModelBase {
  passport?: ApiApiHomeUserPassportloginResponseBody;
  accessToken?: string;
  expireTime?: number;

  protected async __init__() {
    this.passport = this.$useStateLocal({
      queryKey: ['passport'],
    });
    this.accessToken = this.$useStateCookie({
      queryKey: ['token'],
    });
    this.expireTime = this.$useStateCookie({
      queryKey: ['expireTime'],
    });
  }

  loginSimple() {
    return this.$useMutationData<ApiApiHomeUserPassportloginResponseBody, ApiApiHomeUserPassportloginSimpleRequestBody>({
      mutationKey: ['login'],
      mutationFn: async params => {
        return this.$api.homeUserPassport.loginSimple(params);
      },
      onSuccess: data => {
        // save
        this._setPassport(data);
        // page: home
        this.$router.replace('/');
      },
    });
  }

  logout() {
    return this.$useMutationData<unknown, undefined>({
      mutationKey: ['logout'],
      mutationFn: async () => {
        return this.$api.homeUserPassport.logout();
      },
      onSuccess: () => {
        // clear
        this.$clear(); // not await
        this._setPassport();
        // page: login
        this.$router.replace('/login');
      },
    });
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.expireTime && this.expireTime > Date.now();
  }

  get jwtAuthorization(): string | undefined {
    return this.isAuthenticated ? this.accessToken : undefined;
  }

  get user() {
    return this.passport?.user;
  }

  private _setPassport(data?: ApiApiHomeUserPassportloginResponseBody) {
    this.passport = data;
    if (data) {
      this.expireTime = Date.now() + (data.jwt.expiresIn - this.scope.config.passport.accessToken.expireTimeDelay) * 1000;
      this.accessToken = data.jwt.accessToken;
    } else {
      this.expireTime = undefined;
      this.accessToken = undefined;
    }
  }
}
