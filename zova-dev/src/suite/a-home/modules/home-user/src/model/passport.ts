import { catchError } from '@cabloy/utils';
import { IJwtInfo } from 'zova-module-a-interceptor';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiApiHomeUserPassportloginResponseBody, ApiApiHomeUserPassportloginSimpleRequestBody } from 'zova-module-home-api';

@Model()
export class ModelPassport extends BeanModelBase {
  passport?: ApiApiHomeUserPassportloginResponseBody['passport'];
  jwt?: ApiApiHomeUserPassportloginResponseBody['jwt'];
  accessToken?: string;
  expireTime?: number;

  protected async __init__() {
    this.passport = process.env.CLIENT
      ? this.$useStateLocal({ queryKey: ['passport'] })
      : this.$useStateMem({ queryKey: ['passport'] });
    this.jwt = this.$useStateLocal({ queryKey: ['jwt'] });
    this.expireTime = this.$useStateLocal({ queryKey: ['expireTime'] });
    this.accessToken = this.$useStateCookie({ queryKey: ['token'] });
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
    return this.$useMutationData<void, void>({
      mutationKey: ['logout'],
      mutationFn: async () => {
        await this.$api.homeUserPassport.logout();
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

  get user() {
    return this.passport?.user;
  }

  async getJwtInfo(): Promise<IJwtInfo | undefined> {
    if (!this.accessToken) return undefined;
    return {
      accessToken: this.accessToken,
      refreshToken: this.jwt?.refreshToken,
      expiresIn: this.jwt?.expiresIn,
      expireTime: this.expireTime,
    };
  }

  async refreshAuthToken(refreshToken: string): Promise<IJwtInfo> {
    return await this.$api.homeUserPassport.refreshAuthToken({ refreshToken });
  }

  async ensurePassport() {
    if (process.env.CLIENT) return this.passport;
    if (!this.passport && this.isAuthenticated) {
      const [passport, error] = await catchError(() => {
        return this.$api.homeUserPassport.current();
      });
      if (error) {
        if (process.env.DEV) {
          console.error(error);
        }
        this.$ssr.redirect('/login');
      }
      this.passport = passport;
    }
    return this.passport;
  }

  private _setPassport(data?: ApiApiHomeUserPassportloginResponseBody) {
    if (data) {
      this.passport = data.passport;
      this.jwt = data.jwt;
      this.expireTime = Date.now() + (data.jwt.expiresIn - this.scope.config.passport.accessToken.expireTimeDelay) * 1000;
      this.accessToken = data.jwt.accessToken;
    } else {
      this.passport = undefined;
      this.jwt = undefined;
      this.expireTime = undefined;
      this.accessToken = undefined;
    }
  }
}
