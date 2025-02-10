import { App, ref } from 'vue';
import { FunctionAsync } from '../decorator/type/functionable.js';

const SymbolRenderOriginal = Symbol('SymbolRenderOriginal');
const SymbolRenderFreezeCounter = Symbol('SymbolRenderFreezeCounter');
const SymbolRenderFreezeSnapshot = Symbol('SymbolRenderFreezeSnapshot');

export const PluginFreeze = {
  install(app: App) {
    app.mixin({
      created() {
        const renderMethod = 'render';
        const self = this;
        const instance = this._;
        self[SymbolRenderFreezeCounter] = ref(0);
        self[SymbolRenderFreezeSnapshot] = undefined;
        self[SymbolRenderOriginal] = instance[renderMethod];
        instance[renderMethod] = function (this, ...args) {
          if (self[SymbolRenderFreezeCounter].value === 0) {
            return self[SymbolRenderOriginal].call(this, ...args);
          }
          if (!self[SymbolRenderFreezeSnapshot]) {
            self[SymbolRenderFreezeSnapshot] = self[SymbolRenderOriginal].call(this, ...args);
          }
          return self[SymbolRenderFreezeSnapshot];
        };
      },
      beforeUnmount() {
        const self = this;
        if (self[SymbolRenderFreezeSnapshot]) {
          self[SymbolRenderFreezeSnapshot] = undefined;
        }
      },
      methods: {
        renderFreeze(freeze: boolean) {
          const self = this;
          if (freeze) {
            if (self[SymbolRenderFreezeCounter].value === 0) {
              self[SymbolRenderFreezeSnapshot] = undefined;
            }
            self[SymbolRenderFreezeCounter].value++;
          } else {
            self[SymbolRenderFreezeCounter].value--;
            if (self[SymbolRenderFreezeCounter].value === 0) {
              self[SymbolRenderFreezeSnapshot] = undefined;
            }
          }
        },
        async renderFreezeBegin<RESULT>(fn: FunctionAsync<RESULT>): Promise<RESULT> {
          const self = this;
          try {
            self.renderFreeze(true);
            return await fn();
          } finally {
            self.renderFreeze(false);
          }
        },
      },
    });
  },
};
