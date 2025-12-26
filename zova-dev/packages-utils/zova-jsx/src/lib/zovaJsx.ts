import type { VNode } from 'vue';
import type { IFormProviderComponents, TypeRenderComponent, TypeRenderComponentJsx, TypeRenderComponentJsxProps } from '../types/rest.ts';
import { celEnvBase, evaluateExpressions } from '@cabloy/utils';
import { classes } from 'typestyle';
import { createTextVNode, h } from 'vue';
import { BeanSimple, cast } from 'zova-core';
import { renderFieldJsxPropsSystem } from './const.ts';
import { isNativeElement, isZovaComponent } from './utils.ts';

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

  public render(componentOptions: TypeRenderComponent | undefined, props: {}, celScope: {}) {
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

  public normalizeComponenOptions(componenOptions: TypeRenderComponent | undefined): TypeRenderComponentJsx {
    if (componenOptions && typeof componenOptions === 'object') return componenOptions;
    return { type: componenOptions ?? 'text' as any };
  }

  public normalizeComponent(type: TypeRenderComponent) {
    if (typeof type === 'object') {
      // type = (type as TypeRenderComponentJsx).type as any;
      throw new TypeError('should not be here');
    }
    if (typeof type === 'function') return type;
    if (typeof type === 'string') {
      type = this.components?.[type] ?? type;
    }
    if (isZovaComponent(type)) return this.app.meta.component.getZovaComponent(type as never);
    // div/QInput
    return type;
  }

  private _renderJsxSingle(Component: any, componentOptions: TypeRenderComponentJsx, props: {}, celScope: {}) {
    // key
    cast(props).key = this.evaluateExpression(componentOptions.key, celScope);
    // props
    this._renderJsxProps(componentOptions.props, props, celScope);
    // children
    let children;
    const propsChildren = componentOptions.props?.children;
    if (!propsChildren) {
      children = undefined;
    } else {
      if (isNativeElement(Component)) {
        children = this._renderJsxChildren(componentOptions.props!.children, celScope);
      } else {
        children = () => {
          return this._renderJsxChildren(componentOptions.props!.children, celScope);
        };
      }
    }
    return h(Component, props, children);
  }

  private _renderJsxProps(jsxProps: TypeRenderComponentJsxProps | undefined, props: {}, celScope: {}) {
    if (!jsxProps) return props;
    const keys = Object.keys(jsxProps).filter(item => !renderFieldJsxPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const keyValue = this.evaluateExpression(jsxProps[key], celScope);
      if (key === 'class') {
        props[key] = classes(props[key], keyValue);
      } else {
        props[key] = keyValue;
      }
    }
    return props;
  }

  private _renderJsxChildren(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: VNode[] = [];
    for (const jsxChild of jsxChildren) {
      let child;
      if (jsxChild && typeof jsxChild === 'object' && jsxChild.type) {
        const props = {};
        child = this.render(jsxChild, props, celScope);
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
