import { catchError } from '@cabloy/utils';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiApiHomeUserPassportcurrentResponseBody, ApiApiHomeUserPassportloginResponseBody, ApiApiHomeUserPassportloginSimpleRequestBody } from 'zova-module-home-api';

@Model()
export class ModelPassport extends BeanModelBase {
  passport?: ApiApiHomeUserPassportcurrentResponseBody;
  accessToken?: string;
  expireTime?: number;

  protected async __init__() {
    this.passport = process.env.CLIENT
      ? this.$useStateLocal({ queryKey: ['passport'] })
      : undefined;
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

  get jwtAuthorization(): string | undefined {
    return this.isAuthenticated ? this.accessToken : undefined;
  }

  get user() {
    return this.passport?.user;
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
      this.expireTime = Date.now() + (data.jwt.expiresIn - this.scope.config.passport.accessToken.expireTimeDelay) * 1000;
      this.accessToken = data.jwt.accessToken;
    } else {
      this.passport = undefined;
      this.expireTime = undefined;
      this.accessToken = undefined;
    }
  }
}
