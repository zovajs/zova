import type { VNode } from 'vue';
import type { IFormProviderComponents, TypeRenderComponent, TypeRenderComponentJsx, TypeRenderComponentJsxProps } from '../types/rest.ts';
import { celEnvBase, evaluateExpressions } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { classes } from 'typestyle';
import { createTextVNode, h } from 'vue';
import { BeanSimple, cast } from 'zova-core';
import { renderFieldJsxPropsSystem } from './const.ts';
import { isJsxComponent, isNativeElement, isZovaComponent } from './utils.ts';

type CelEnv = typeof celEnvBase;

export class ZovaJsx extends BeanSimple {
  private _components: IFormProviderComponents | undefined;
  private _celEnv: CelEnv | undefined;

  constructor(components?: IFormProviderComponents, celEnv?: CelEnv) {
    super();
    this._components = components;
    this._celEnv = celEnv;
  }

  public get components() {
    return this._components;
  }

  public get celEnv(): CelEnv {
    return this._celEnv ?? celEnvBase;
  }

  public evaluateExpression(expression: any, celScope?: {}) {
    return evaluateExpressions(
      expression,
      celScope,
      this.celEnv,
    );
  }

  public renderJsxOrCel(componentOptions: TypeRenderComponent | any, props: {} | undefined, celScope: {}) {
    if (isJsxComponent(componentOptions)) {
      return () => this.render(componentOptions, props, celScope);
    }
    return this.evaluateExpression(componentOptions, celScope);
  }

  public render(componentOptions: TypeRenderComponent, props: {} | undefined, celScope: {}) {
    props = props ?? {};
    componentOptions = this.normalizeComponenOptions(componentOptions);
    // vIf
    const vIf = this.evaluateExpression(componentOptions.props?.['v-if'], celScope);
    if (vIf === false) return;
    // component
    const Component = this.normalizeComponent(componentOptions.type);
    // vFor
    const vFor = this.evaluateExpression(componentOptions.props?.['v-for'], celScope);
    if (!vFor) return this._renderJsxSingle(Component, componentOptions, props, celScope);
    const children: VNode[] = [];
    for (let index = 0; index < vFor.length; index++) {
      const each = vFor[index];
      const eachName = this.evaluateExpression(componentOptions.props?.['v-each'], celScope) ?? 'each';
      const celScopeEach = { ...celScope, [eachName]: each, [`${eachName}Index`]: index };
      const propsEach = { ...props };
      const child = this._renderJsxSingle(Component, componentOptions, propsEach, celScopeEach);
      if (child) {
        children.push(child);
      }
    }
    return children;
  }

  public normalizeComponenOptions(componentOptions: TypeRenderComponent): TypeRenderComponentJsx {
    if (typeof componentOptions === 'object') return componentOptions;
    return { type: componentOptions as any };
  }

  public normalizeComponent(type: TypeRenderComponent) {
    if (typeof type === 'function') return type;
    if (typeof type === 'string') {
      type = this.components?.[type] ?? type;
    }
    // div/QInput/Zova Component
    return type;
  }

  private _renderJsxSingle(Component: any, componentOptions: TypeRenderComponentJsx, props: {}, celScope: {}) {
    // key
    cast(props).key = this.evaluateExpression(componentOptions.key, celScope);
    // props
    this.renderJsxProps(componentOptions.props, props, celScope);
    // children
    let children;
    const propsChildren = componentOptions.props?.children;
    if (!propsChildren) {
      children = undefined;
    } else {
      if (isNativeElement(Component)) {
        children = this.renderJsxChildrenDirect(componentOptions.props!.children, celScope);
      } else {
        const childrenCollect = this._renderJsxChildrenCollect(componentOptions.props!.children, celScope);
        if (isZovaComponent(Component)) {
          for (const key in childrenCollect) {
            const slot = childrenCollect[key];
            if (key === 'default') {
              children = slot;
            } else {
              props[`slot${toUpperCaseFirstChar(key)}`] = slot;
            }
          }
        } else {
          children = childrenCollect;
        }
      }
    }
    if (isZovaComponent(Component)) {
      Component = this.app.meta.component.getZovaComponent(Component as never);
    }
    return h(Component, props, children);
  }

  public renderJsxProps(jsxProps: TypeRenderComponentJsxProps | undefined, props: {}, celScope: {}) {
    if (!jsxProps) return props;
    const keys = Object.keys(jsxProps).filter(item => !renderFieldJsxPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const keyValue = this.renderJsxOrCel(jsxProps[key], undefined, celScope);
      if (key === 'class') {
        props[key] = classes(props[key], keyValue);
      } else {
        props[key] = keyValue;
      }
    }
    return props;
  }

  private _renderJsxChildrenCollect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: TypeRenderComponentJsx[] = [];
    const slots: Record<string, TypeRenderComponentJsx> = {};
    for (const jsxChild of jsxChildren) {
      if (jsxChild && typeof jsxChild === 'object' && jsxChild.props?.['v-slot']) {
        const slotName = jsxChild.props?.['v-slot'];
        const slotScopeName = jsxChild.props?.['v-slot-scope'];
        let slot;
        if (slotScopeName) {
          slot = slotScope => {
            const celScopeSub = { ...celScope, [slotScopeName]: slotScope };
            return this.renderJsxChildrenDirect(jsxChild, celScopeSub);
          };
        } else {
          slot = () => {
            return this.renderJsxChildrenDirect(jsxChild, celScope);
          };
        }
        slots[slotName] = slot;
      } else {
        children.push(jsxChild);
      }
    }
    // slotDefault
    const slotDefault = children.length === 0
      ? undefined
      : () => {
          return this.renderJsxChildrenDirect(children, celScope);
        };
    // ok
    return {
      ...slots,
      default: slotDefault,
    };
  }

  public renderJsxChildrenDirect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: VNode[] = [];
    for (const jsxChild of jsxChildren) {
      let child;
      if (isJsxComponent(jsxChild)) {
        if (jsxChild.type === 'var') {
          const props = {};
          this.renderJsxProps(jsxChild.props, props, celScope);
          celScope = { ...celScope, [cast(props).name]: cast(props).value };
          child = undefined;
        } else {
          child = this.render(jsxChild, undefined, celScope);
        }
      } else {
        const childText = this.evaluateExpression(jsxChild, celScope);
        child = createTextVNode(childText);
      }
      if (child) {
        if (Array.isArray(child)) {
          children.push(...child);
        } else {
          children.push(child);
        }
      }
    }
    return children;
  }
}
