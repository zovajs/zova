import type { VNode } from 'vue';
import type { IFormProviderComponents, TypeRenderComponent, TypeRenderComponentJsx, TypeRenderComponentJsxProps } from '../types/rest.ts';
import { compose } from '@cabloy/compose';
import { celEnvBase, evaluateExpressions, getProperty, isPromise } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { classes } from 'typestyle';
import { createTextVNode, h } from 'vue';
import { beanFullNameFromOnionName, BeanSimple, cast, deepExtend, objectAssignReactive } from 'zova-core';
import { renderFieldJsxPropsSystem } from './const.ts';
import { isJsxComponent, isJsxEvent, isNativeElement, isZovaComponent, normalizePropName } from './utils.ts';

type CelEnv = typeof celEnvBase;

export class ZovaJsx extends BeanSimple {
  private _components: IFormProviderComponents | undefined;
  private _actions: Record<string, string> | undefined;
  private _celEnv: CelEnv;
  private _transientObject: any;

  constructor(components?: IFormProviderComponents, actions?: Record<string, string>, celEnv?: CelEnv) {
    super();
    this._components = components;
    this._actions = actions;
    this._celEnv = this._prepareCelEnv(celEnv ?? celEnvBase);
  }

  private _prepareCelEnv(celEnv: CelEnv) {
    celEnv = celEnv.clone();
    celEnv.registerFunction('getEvent():dyn', () => {
      return this.transientObject.eventObject ?? null; // null means valid value
    });
    celEnv.registerFunction('getEventProp(string):dyn', prop => {
      return getProperty(this.transientObject.eventObject, prop) ?? null; // null means valid value
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

  public get transientObject() {
    return this._transientObject;
  }

  public get event(): Event | undefined {
    return this.transientObject?.eventObject;
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

  public renderJsxOrCel(componentOptions: TypeRenderComponent | any, props: {} | undefined, celScope: {}, renderContext: {}) {
    // component
    if (isJsxComponent(componentOptions)) {
      const transientObject = this.transientObject;
      return () => {
        return this.setTransientObject(transientObject, () => {
          return this.render(componentOptions, props, celScope, renderContext);
        });
      };
    }
    if (isJsxEvent(componentOptions)) {
      let transientObject = this.transientObject;
      return (event: Event) => {
        transientObject = { ...transientObject, eventObject: event };
        return this.setTransientObject(transientObject, () => {
          return this.renderEvent(event, componentOptions, celScope, renderContext);
        });
      };
    }
    // normal
    return this.evaluateExpression(componentOptions, celScope);
  }

  public renderEvent(event: Event, componentOptions: TypeRenderComponentJsx, celScope: {}, renderContext: {}) {
    // props
    if (event && event instanceof Event) {
      const props: any = this.renderJsxProps(componentOptions.props, {}, celScope, renderContext);
      if (props.stop) event.stopPropagation();
      if (props.prevent) event.preventDefault();
    }
    // render
    const eventRes: any[] = [];
    celScope = objectAssignReactive({}, celScope, { res: eventRes });
    return this.renderEventDirect(componentOptions, celScope, renderContext, eventRes);
  }

  public renderEventDirect(componentOptions: TypeRenderComponentJsx, celScope: {}, renderContext: {}, eventRes: any[], next?: Function) {
    const actions = this._collectEventActions(componentOptions, celScope, renderContext, eventRes);
    if (!actions || actions.length === 0) return next ? next(undefined) : undefined;
    const transientObject = this.transientObject;
    return compose(actions)(undefined, actionRes => {
      if (!next) return actionRes;
      return this.setTransientObject(transientObject, () => {
        return next(actionRes);
      });
    });
  }

  private _collectEventActions(componentOptions: TypeRenderComponentJsx, celScope: {}, renderContext: {}, eventRes: any[]) {
    let actionChildren = componentOptions.props?.children;
    if (!actionChildren) return;
    if (!Array.isArray(actionChildren)) actionChildren = [actionChildren];
    const actions: Function[] = [];
    const transientObject = this.transientObject;
    for (let index = 0; index < actionChildren.length; index++) {
      const actionChild = actionChildren[index];
      // action
      const action = (actionRes: any, next: Function) => {
        if (isPromise(actionRes)) {
          return actionRes.then(actionRes => {
            return this._actionHandler(index, actionChild, actionRes, next, actionChildren, celScope, renderContext, eventRes, transientObject);
          });
        } else {
          return this._actionHandler(index, actionChild, actionRes, next, actionChildren, celScope, renderContext, eventRes, transientObject);
        }
      };
      actions.push(action);
    }
    return actions;
  }

  private _actionHandler(
    index: number,
    actionChild: TypeRenderComponentJsx,
    actionRes: any,
    next: Function,
    actionChildren: TypeRenderComponentJsx[],
    celScope: {},
    renderContext: {},
    eventRes: any[],
    transientObject: any,
  ) {
    return this.setTransientObject(transientObject, () => {
      // record res
      if (index > 0) {
        if (actionRes === undefined) actionRes = null;
        eventRes[index - 1] = actionRes;
        const actionChildPrev = actionChildren[index - 1];
        const resName = cast(actionChildPrev.props)?.res;
        if (resName) {
          celScope = objectAssignReactive({}, celScope, { [resName]: actionRes });
        }
      }
      // vIf
      const vIf = this.evaluateExpression(actionChild.props?.['v-if'], celScope);
      if (vIf === false) return next(undefined);
      // action
      if (actionChild.type === 'actionVar') {
        const props = this.renderJsxProps(actionChild.props, {}, celScope, renderContext);
        celScope = objectAssignReactive({}, celScope, { [cast(props).name]: cast(props).value });
        return next(undefined);
      } else if (actionChild.type === 'actionExpr') {
        const expression = this.evaluateExpression(cast(actionChild.props)?.expression, celScope);
        return next(expression);
      } else if (isJsxEvent(actionChild)) {
        // nested action
        eventRes[index] = [];
        return this.renderEventDirect(actionChild, objectAssignReactive({}, celScope), renderContext, eventRes[index], next);
      } else {
        // normal
        return this._renderEventActionNormal(actionChild, celScope, renderContext, next);
      }
    });
  }

  private _renderEventActionNormal(
    actionChild: TypeRenderComponentJsx,
    celScope: {},
    renderContext: {},
    next: Function,
  ) {
    // action
    const actionName = this.normalizeAction(actionChild.type);
    const beanFullName = beanFullNameFromOnionName(actionName, 'action' as never);
    const beanInstance = this.sys.bean._getBeanSyncOnly(beanFullName);
    if (beanInstance) {
      // sync
      return this._renderEventActionNormal_inner(beanInstance, actionChild, celScope, renderContext, next);
    }
    // async
    const transientObject = this.transientObject;
    return this.sys.bean._getBean(beanFullName, false).then(beanInstance => {
      return this.setTransientObject(transientObject, () => {
        return this._renderEventActionNormal_inner(beanInstance, actionChild, celScope, renderContext, next);
      });
    });
  }

  private _renderEventActionNormal_inner(
    beanInstance: any,
    actionChild: TypeRenderComponentJsx,
    celScope: {},
    renderContext: {},
    next: Function,
  ) {
    const onionOptions = beanInstance.$onionOptions;
    // props
    let props = this.renderJsxProps(actionChild.props, {}, celScope, renderContext);
    if (onionOptions) {
      props = deepExtend({}, onionOptions, props);
    }
    if (!renderContext) throw new Error('should provide renderContext');
    return beanInstance.execute(props, renderContext, next);
  }

  public render(componentOptions: TypeRenderComponent, props: {} | undefined, celScope: {}, renderContext: {}) {
    props = props ?? {};
    componentOptions = this.normalizeComponenOptions(componentOptions);
    // vIf
    const vIf = this.evaluateExpression(componentOptions.props?.['v-if'], celScope);
    if (vIf === false) return;
    // component
    const Component = this.normalizeComponent(componentOptions.type);
    // vFor
    const vFor = this.evaluateExpression(componentOptions.props?.['v-for'], celScope);
    if (!vFor) return this._renderJsxSingle(Component, componentOptions, props, celScope, renderContext);
    const children: VNode[] = [];
    for (let index = 0; index < vFor.length; index++) {
      const each = vFor[index];
      const eachName = this.evaluateExpression(componentOptions.props?.['v-each'], celScope) ?? 'each';
      const celScopeEach = objectAssignReactive({}, celScope, { [eachName]: each, [`${eachName}Index`]: index });
      const propsEach = { ...props };
      const child = this._renderJsxSingle(Component, componentOptions, propsEach, celScopeEach, renderContext);
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

  private _renderJsxSingle(Component: any, componentOptions: TypeRenderComponentJsx, props: {}, celScope: {}, renderContext: {}) {
    const _isZovaComponent = isZovaComponent(Component);
    // key
    cast(props).key = this.evaluateExpression(componentOptions.key, celScope);
    // props
    this.renderJsxProps(componentOptions.props, props, celScope, renderContext);
    // children
    let children;
    const propsChildren = componentOptions.props?.children;
    if (!propsChildren) {
      children = undefined;
    } else {
      if (isNativeElement(Component)) {
        children = this.renderJsxChildrenDirect(componentOptions.props!.children, celScope, renderContext);
      } else {
        const childrenCollect = this._renderJsxChildrenCollect(componentOptions.props!.children, celScope, renderContext);
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
    if (_isZovaComponent && renderContext) {
      cast(vnode).zovaHostProviders = { $$renderContext: renderContext };
    }
    return vnode;
  }

  public renderJsxProps(jsxProps: TypeRenderComponentJsxProps | undefined, props: {}, celScope: {}, renderContext: {}) {
    if (!jsxProps) return props;
    const keys = Object.keys(jsxProps).filter(item => !renderFieldJsxPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      let keyValue = this.renderJsxOrCel(jsxProps[key], undefined, celScope, renderContext);
      const propName = normalizePropName(key);
      if (propName === 'class') {
        keyValue = classes(props[propName], keyValue);
      }
      props[propName] = keyValue;
    }
    return props;
  }

  private _renderJsxChildrenCollect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}, renderContext: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: TypeRenderComponentJsx[] = [];
    const slots: Record<string, TypeRenderComponentJsx> = {};
    const transientObject = this.transientObject;
    for (const jsxChild of jsxChildren) {
      if (jsxChild && typeof jsxChild === 'object' && jsxChild.props?.['v-slot']) {
        const slotName = jsxChild.props?.['v-slot'];
        const slotScopeName = jsxChild.props?.['v-slot-scope'];
        let slot;
        if (slotScopeName) {
          slot = slotScope => {
            return this.setTransientObject(transientObject, () => {
              const celScopeSub = objectAssignReactive({}, celScope, { [slotScopeName]: slotScope });
              return this.renderJsxChildrenDirect(jsxChild, celScopeSub, renderContext);
            });
          };
        } else {
          slot = () => {
            return this.setTransientObject(transientObject, () => {
              return this.renderJsxChildrenDirect(jsxChild, celScope, renderContext);
            });
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
          return this.setTransientObject(transientObject, () => {
            return this.renderJsxChildrenDirect(children, celScope, renderContext);
          });
        };
    // ok
    return {
      ...slots,
      default: slotDefault,
    };
  }

  public renderJsxChildrenDirect(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[], celScope: {}, renderContext: {}) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: VNode[] = [];
    for (const jsxChild of jsxChildren) {
      let child;
      if (isJsxComponent(jsxChild)) {
        if (jsxChild.type === 'var') {
          const props = this.renderJsxProps(jsxChild.props, {}, celScope, renderContext);
          celScope = objectAssignReactive({}, celScope, { [cast(props).name]: cast(props).value });
          child = undefined;
        } else {
          child = this.render(jsxChild, undefined, celScope, renderContext);
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
