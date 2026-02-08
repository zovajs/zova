import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ToolIcon } from '../../bean/tool.icon.js';
import { $getZovaIcon } from '../../lib/useZovaIcon.js';
import { IIconRecord } from '../../types/icon.js';

export interface ControllerIconProps {
  name?: keyof IIconRecord;
  href?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

@Controller()
export class ControllerIcon extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$toolIcon: ToolIcon;

  protected async __init__() {
    await this._load();
  }

  private async _load() {
    const icon = this.$props.name;
    if (icon === 'none' as any || !icon) {
      return;
    }
    await this.$$toolIcon.parseIconInfo(icon);
  }

  protected render() {
    // icon info
    const iconInfo = $getZovaIcon(this.$props.name);
    // href
    let href = this.$props.href;
    if (!href) {
      href = `#${iconInfo?.symbolId || ''}`;
    }
    // width/height
    const defaultSize = this.scope.config.icon.size;
    const width = this.$props.width ?? this.$props.height ?? defaultSize;
    const height = this.$props.height ?? this.$props.width ?? defaultSize;
    return (
      <svg
        class="zova-icon__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-hidden="true"
        width={width}
        height={height}
        style={
          { color: this.$props.color }
        }
      >
        <use xlinkHref={href}></use>
      </svg>
    );
  }
}
