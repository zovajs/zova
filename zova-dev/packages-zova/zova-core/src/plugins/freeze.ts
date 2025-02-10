import { App, ref } from 'vue';

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
    });
  },
};
