import type { QVueGlobals } from 'quasar';
import type { UnwrapNestedRefs } from 'vue';

import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $q: UnwrapNestedRefs<QVueGlobals>;
  }
}
