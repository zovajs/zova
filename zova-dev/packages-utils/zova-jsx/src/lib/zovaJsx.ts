import type { VNode } from 'vue';
import type { IFormProviderComponents, TypeRenderComponent, TypeRenderComponentJsx, TypeRenderComponentJsxProps } from '../types/rest.ts';
import { compose } from '@cabloy/compose';
import { celEnvBase, evaluateExpressions, getProperty, isPromise } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { classes } from 'typestyle';
import { createTextVNode, h } from 'vue';
import { beanFullNameFromOnionName, BeanSimple, cast, deepExtend } from 'zova-core';
import { renderFieldJsxPropsSystem } from './const.ts';
import { isJsxComponent, isJsxEvent, isNativeElement, isZovaComponent, normalizePropName } from './utils.ts';

type CelEnv = typeof celEnvBase;

export class ZovaJsx extends BeanSimple {
  private _components: IFormProviderComponents | undefined;
  private _actions: Record<string, string> | undefined;
  private _celEnv: CelEnv;
  private _eventObject?: Event;
  private _transientObject?: {};

  constructor(components?: IFormProviderComponents, actions?: Record<string, string>, celEnv?: CelEnv) {
    super();
    this._components = components;
    this._actions = actions;
    this._celEnv = this._prepareCelEnv(celEnv ?? celEnvBase);
  }

  private _prepareCelEnv(celEnv: CelEnv) {
    celEnv = celEnv.clone();
    celEnv.registerFunction('getEventProp(string):dyn', prop => {
      return getProperty(this._eventObject, prop);
    });
    return celEnv;
  }

  public setTransientObject<T>(transientObject: {} | undefined, fnMethod: () => T): T {
    const transientObjectPrev = this._transientObject;
    this._transientObject = transientObject;
    try {
      return fnMethod();
    } finally {
      this._transientObject = transientObjectPrev;
    }
  }

  public getTransientValue(name: string) {
    return getProperty(this._transientObject, name);
  }

  public get components() {
    return this._components;
  }

  public get actions() {
    return this._actions;
  }

  public get celEnv(): CelEnv {
    return this._celEnv;
  }

  public evaluateExpression(expression: any, celScope?: {}) {
    return evaluateExpressions(
      expression,
      celScope,
      this.celEnv,
    );
  }

  public renderJsxOrCel(componentOptions: TypeRenderComponent | any, props: {} | undefined, celScope: {}, hostProviders?: {}) {
    // component
    if (isJsxComponent(componentOptions)) {
      return () => this.render(componentOptions, props, celScope);
    }
    if (isJsxEvent(componentOptions)) {
      return (event: Event) => {
        return this.renderEvent(event, componentOptions, celScope, hostProviders);
      };
    }
    // normal
    return this.evaluateExpression(componentOptions, celScope);
  }

  public renderEvent(event: Event, componentOptions: TypeRenderComponentJsx, celScope: {}, hostProviders: {} | undefined) {
    // event
    this._eventObject = event;
    // props
    if (event && event instanceof Event) {
      const props: any = this.renderJsxProps(componentOptions.props, {}, celScope);
      if (props.stop) this._eventObject.stopPropagation();
      if (props.prevent) this._eventObject.preventDefault();
    }
    // render
    const eventRes: any[] = [];
    celScope = { ...celScope, res: eventRes };
    const result = this.renderEventDirect(componentOptions, celScope, hostProviders, eventRes);
    if (isPromise(result)) {
      return result.then(result => {
        this._eventObject = undefined;
        return result;
      });
    }
    this._eventObject = undefined;
    return result;
  }

  public renderEventDirect(componentOptions: TypeRenderComponentJsx, celScope: {}, hostProviders: {} | undefined, eventRes: any[], next?: Function) {
    const actions = this._collectEventActions(componentOptions, celScope, hostProviders, eventRes);
    if (!actions || actions.length === 0) return next ? next(undefined) : undefined;
    return compose(actions)(undefined, actionRes => {
      return next ? next(actionRes) : actionRes;
    });
  }

  private _collectEventActions(componentOptions: TypeRenderComponentJsx, celScope: {}, hostProviders: {} | undefined, eventRes: any[]) {
    let actionChildren = componentOptions.props?.children;
    if (!actionChildren) return;
    if (!Array.isArray(actionChildren)) actionChildren = [actionChildren];
    const actions: Function[] = [];
    for (let index = 0; index < actionChildren.length; index++) {
      const actionChild = actionChildren[index];
      // vIf
      const vIf = this.evaluateExpression(actionChild.props?.['v-if'], celScope);
      if (vIf === false) continue;
      // action
      const action = (actionRes, next) => {
        if (index > 0) {
          eventRes[index - 1] = actionRes;
        }
        if (isJsxEvent(actionChild)) {
          // nested action
          eventRes[index] = [];
          return this.renderEventDirect(actionChild, celScope, hostProviders, eventRes[index], next);
        } else {
          // normal
          return this._renderEventActionNormal(actionChild, celScope, hostProviders, eventRes, next);
        }
      };
      actions.push(action);
    }
    return actions;
  }

  private _renderEventActionNormal(
    actionChild: TypeRenderComponentJsx,
    celScope: {},
    hostProviders: {} | undefined,
    eventRes: any[],
    next: Function,
  ) {
    // action
    const actionName = this.normalizeAction(actionChild.type);
    const beanFullName = beanFullNameFromOnionName(actionName, 'action' as never);
    const beanInstance = this.sys.bean._getBeanSyncOnly(beanFullName);
    if (beanInstance) {
      // sync
      return this._renderEventActionNormal_inner(beanInstance, actionChild, celScope, hostProviders, eventRes, next);
    }
    // async
    return this.sys.bean._getBean(beanFullName).then(beanInstance => {
      return this._renderEventActionNormal_inner(beanInstance, actionChild, celScope, hostProviders, eventRes, next);
    });
  }

  private _renderEventActionNormal_inner(
    beanInstance: any,
    actionChild: TypeRenderComponentJsx,
    celScope: {},
    hostProviders: {} | undefined,
    _eventRes: any[],
    next: Function,
  ) {
    const onionOptions = beanInstance.$onionOptions;
    // props
    let props = this.renderJsxProps(actionChild.props, {}, celScope);
    if (onionOptions) {
      props = deepExtend({}, onionOptions, props);
    }
    return beanInstance.execute(props, cast(hostProviders).$$renderContext, next);
  }

  public render(componentOptions: TypeRenderComponent, props: {} | undefined, celScope: {}, hostProviders?: {}) {
    props = props ?? {};
    componentOptions = this.normalizeComponenOptions(componentOptions);
    // vIf
    const vIf = this.evaluateExpression(componentOptions.props?.['v-if'], celScope);
    if (vIf === false) return;
    // component
    const Component = this.normalizeComponent(componentOptions.type);
    // vFor
    const vFor = this.evaluateExpression(componentOptions.props?.['v-for'], celScope);
    if (!vFor) return this._renderJsxSingle(Component, componentOptions, props, celScope, hostProviders);
    const children: VNode[] = [];
    for (let index = 0; index < vFor.length; index++) {
      const each = vFor[index];
      const eachName = this.evaluateExpression(componentOptions.props?.['v-each'], celScope) ?? 'each';
      const celScopeEach = { ...celScope, [eachName]: each, [`${eachName}Index`]: index };
      const propsEach = { ...props };
      const child = this._renderJsxSingle(Component, componentOptions, propsEach, celScopeEach, hostProviders);
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

  public normalizeAction(type: string) {
    return this.actions?.[type] ?? type;
  }

  private _renderJsxSingle(Component: any, componentOptions: TypeRenderComponentJsx, props: {}, celScope: {}, hostProviders?: {}) {
    const _isZovaComponent = isZovaComponent(Component);
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
        const childrenCollect = this._renderJsxChildrenCollect(componentOptions.props!.children, celScope, hostProviders);
        if (_isZovaComponent) {
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
    if (_isZovaComponent) {
      Component = this.sys.meta.component.getZovaComponent(Component as never);
    }
    const vnode = h(Component, props, children);
    if (_isZovaComponent && hostProviders) {
      cast(vnode).zovaHostProviders = hostProviders;
    }
    return vnode;
  }

  public renderJsxProps(jsxProps: TypeRenderComponentJsxProps | undefined, props: {}, celScope: {}, hostProviders?: {}) {
    if (!jsxProps) return props;
    const keys = Object.keys(jsxProps).filter(item => !renderFieldJsxPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      let keyValue = this.renderJsxOrCel(jsxProps[key], undefined, celScope, hostProviders);
      const propName = normalizePropName(key);
      if (propName === 'class') {
        keyValue = classes(props[propName], keyValue);
      }
      props[propName] = keyValue;
    }
    return props;
  }

  private _renderJsxChildrenCollect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}, hostProviders?: {}) {
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
            return this.renderJsxChildrenDirect(jsxChild, celScopeSub, hostProviders);
          };
        } else {
          slot = () => {
            return this.renderJsxChildrenDirect(jsxChild, celScope, hostProviders);
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
          return this.renderJsxChildrenDirect(children, celScope, hostProviders);
        };
    // ok
    return {
      ...slots,
      default: slotDefault,
    };
  }

  public renderJsxChildrenDirect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}, hostProviders?: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: VNode[] = [];
    for (const jsxChild of jsxChildren) {
      let child;
      if (isJsxComponent(jsxChild)) {
        if (jsxChild.type === 'var') {
          const props = {};
          this.renderJsxProps(jsxChild.props, props, celScope, hostProviders);
          celScope = { ...celScope, [cast(props).name]: cast(props).value };
          child = undefined;
        } else {
          child = this.render(jsxChild, undefined, celScope, hostProviders);
        }
      } else {
        const childText = this.evaluateExpression(jsxChild, celScope);
        child = createTextVNode(childText ?? '');
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
