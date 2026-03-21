import type { TypeStyle } from 'typestyle';
import type { NestedCSSProperties } from 'typestyle/lib/types.js';
import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyBeanInit } from 'zova';

import { createTypeStyle, cssRaw, cssRule, style } from 'typestyle';
import { beanFullNameFromOnionName, BeanSimple, SymbolBeanFullName, useComputed } from 'zova';

import type { ScopeModule } from './.metadata/this.js';

import { __ThisModule__ } from './.metadata/this.js';
import { BeanTheme } from './bean/bean.theme.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyBeanInit {
  private _beanTheme: BeanTheme;
  private _beanCssDefault: any;
  private _styleInstance: TypeStyle;

  async appInitialize() {
    if (process.env.SERVER) {
      this._styleInstance = createTypeStyle();
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        const styles = this._styleInstance.getStyles();
        this.ctx.meta.$ssr.context._meta.endingHeadTags += `<style id="styles-target">${styles}</style>`;
      });
    }
    if (process.env.CLIENT && this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      this._styleInstance = createTypeStyle();
      this.ctx.meta.$ssr.onHydrated(() => {
        this._styleInstance.setStylesTarget(document.getElementById('styles-target')!);
      });
    }
  }

  async appInitialized() {
    // theme
    this._beanTheme = await this.bean._getBean(BeanTheme, true);
    // css default
    const scope: ScopeModule = await this.bean.getScope(__ThisModule__);
    this._beanCssDefault = await this.bean._getBean(beanFullNameFromOnionName(scope.config.defaultCss, 'css'), true);
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$style', {
      enumerable: false,
      configurable: true,
      get() {
        return function (props, ...args) {
          return self._patchStyle(beanInstance, props, ...args);
        };
      },
    });
    bean.defineProperty(beanInstance, '$cssRule', {
      enumerable: false,
      configurable: true,
      get() {
        return function (selector: string, ...objects: NestedCSSProperties[]) {
          return self._patchCssRule(beanInstance, selector, ...objects);
        };
      },
    });
    bean.defineProperty(beanInstance, '$cssRaw', {
      enumerable: false,
      configurable: true,
      get() {
        return function (mustBeValidCSS: string) {
          return self._patchCssRaw(beanInstance, mustBeValidCSS);
        };
      },
    });
    bean.defineProperty(beanInstance, '$css', {
      enumerable: false,
      configurable: true,
      get() {
        return self._beanCssDefault;
      },
    });
    bean.defineProperty(beanInstance, '$theme', {
      enumerable: false,
      configurable: true,
      get() {
        return self._beanTheme;
      },
    });
    bean.defineProperty(beanInstance, '$token', {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => self._beanTheme.token);
      },
    });
  }

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (process.env.DEV) {
      if (props && typeof props === 'object') {
        props = Object.assign({ $debugName: beanInstance[SymbolBeanFullName].replaceAll('.', '_') }, props);
      }
    }
    if (this._styleInstance) {
      return this._styleInstance.style(props, ...args);
    } else {
      return style(props, ...args);
    }
  }

  _patchCssRule(_beanInstance: BeanBase, selector: string, ...objects: NestedCSSProperties[]) {
    if (this._styleInstance) {
      return this._styleInstance.cssRule(selector, ...objects);
    } else {
      return cssRule(selector, ...objects);
    }
  }

  _patchCssRaw(_beanInstance: BeanBase, mustBeValidCSS: string) {
    if (this._styleInstance) {
      return this._styleInstance.cssRaw(mustBeValidCSS);
    } else {
      return cssRaw(mustBeValidCSS);
    }
  }
}
