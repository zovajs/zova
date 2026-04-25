export interface ICaptchaSceneRecord {
  'captcha-simple:simple': never;
}

export interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}

export interface ICaptchaProviderRecord {}

export interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord | string;
  token?: unknown;
  payload?: unknown;
}
