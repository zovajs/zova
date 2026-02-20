import LuxonAdapter from '@date-io/luxon';

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends LuxonAdapter {}
  }
}
