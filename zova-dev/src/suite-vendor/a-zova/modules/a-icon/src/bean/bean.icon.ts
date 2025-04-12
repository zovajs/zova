import { BeanBase, Use } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { IIconInfo } from '../types/icon.js';
import { SysIcon } from './sys.icon.js';

const XMLNS = 'http://www.w3.org/2000/svg';
const XMLNS_LINK = 'http://www.w3.org/1999/xlink';

@Bean()
export class BeanIcon extends BeanBase {
  private _iconSSR: Record<string, Record<string, Record<string, string>>> = {};

  @Use()
  private $$sysIcon: SysIcon;

  protected async __init__() {
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this._onRendered();
      });
    }
  }

  async parseIconInfo(iconName?: string): Promise<IIconInfo | undefined> {
    const iconInfo = await this.$$sysIcon.parseIconInfo(iconName);
    if (!iconInfo) return iconInfo;
    this._injectIcon(iconInfo.meta);
    return iconInfo;
  }

  private _onRendered() {
    this.ctx.meta.ssr.context._meta.bodyTags += this._renderSSRContainer();
  }

  private _renderSSRContainer() {
    const contentModules = this._renderSSRModules();
    return `<div id="zova-svg-container" style="position: absolute; width: 0px; height: 0px; display: none;">${contentModules}</div>`;
  }

  private _renderSSRModules() {
    return Object.keys(this._iconSSR)
      .map(moduleName => {
        const moduleId = `zova-svg-module-${moduleName}`;
        const contentGroups = this._renderSSRGroups(this._iconSSR[moduleName], moduleName);
        return `<div id="${moduleId}">${contentGroups}</div>`;
      })
      .join('');
  }

  private _renderSSRGroups(iconSSRGroups: Record<string, Record<string, string>>, moduleName: string) {
    return Object.keys(iconSSRGroups)
      .map(groupName => {
        const groupId = `zova-svg-group-${moduleName}-${groupName}`;
        const contentIcons = this._renderSSRIcons(iconSSRGroups[groupName]);
        return `<svg id="${groupId}" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink">${contentIcons}</svg>`;
      })
      .join('');
  }

  private _renderSSRIcons(iconSSRIcons: Record<string, string>) {
    return Object.keys(iconSSRIcons)
      .map(symbolId => {
        return iconSSRIcons[symbolId];
      })
      .join('');
  }

  private _injectIconSSR(meta: IIconMeta) {
    const iconModule = this._getIconModule(meta.module);
    const iconGroup = iconModule[meta.group];
    if (!this._iconSSR[meta.module]) this._iconSSR[meta.module] = {};
    if (!this._iconSSR[meta.module][meta.group]) this._iconSSR[meta.module][meta.group] = {};
    this._iconSSR[meta.module][meta.group][meta.symbolId] = this._extractIconContent(iconGroup.svg, meta.symbolId)!;
    // ok
    return meta.symbolId;
  }

  private _injectIcon(meta: IIconMeta): string {
    if (process.env.SERVER) {
      return this.self._injectIconSSR(meta);
    }
    //
    const iconModule = this._getIconModule(meta.module);
    const iconGroup = iconModule[meta.group];
    // inject container
    let domContainer = document.getElementById('zova-svg-container');
    if (!domContainer) {
      domContainer = document.createElement('div');
      domContainer.style.position = 'absolute';
      domContainer.style.width = '0';
      domContainer.style.height = '0';
      domContainer.style.display = 'none';
      domContainer.id = 'zova-svg-container';
      document.body.appendChild(domContainer);
    }
    // inject module
    let domModule = document.getElementById(`zova-svg-module-${meta.module}`);
    if (!domModule) {
      domModule = document.createElement('div');
      domModule.id = `zova-svg-module-${meta.module}`;
      domContainer.appendChild(domModule);
    }
    // inject group
    let domGroup = document.getElementById(`zova-svg-group-${meta.module}-${meta.group}`) as unknown as SVGSVGElement;
    if (!domGroup) {
      domGroup = document.createElementNS(XMLNS, 'svg');
      domGroup.id = `zova-svg-group-${meta.module}-${meta.group}`;
      domGroup.setAttribute('xmlns', XMLNS);
      domGroup.setAttribute('xmlns:link', XMLNS_LINK);
      domModule.appendChild(domGroup);
    }
    // inject icon
    const domIcon = document.getElementById(meta.symbolId) as unknown as SVGElement;
    if (!domIcon) {
      const iconContent = this._extractIconContent(iconGroup.svg, meta.symbolId);
      if (iconContent) {
        domGroup.insertAdjacentHTML('beforeend', iconContent);
      }
    }
    // ok
    return meta.symbolId;
  }
}
