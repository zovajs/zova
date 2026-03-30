import '@cabloy/vue-router';

export interface ISsrConfigTransferCache {
  expires?: number | string;
}

export interface ISsrConfig {
  cookieTheme: boolean;
  cookieThemeDarkDefault: boolean;
  optimization: {
    bodyReadyObserver: boolean;
  };
  transferCache: false | ISsrConfigTransferCache;
}

declare module '@cabloy/vue-router' {
  export interface RouteMeta {
    transferCache?: false | ISsrConfigTransferCache;
  }
}
