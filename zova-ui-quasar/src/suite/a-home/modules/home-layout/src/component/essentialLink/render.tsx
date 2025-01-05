import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerEssentialLink } from './controller.js';
import { QIcon, QItem, QItemLabel, QItemSection } from 'quasar';

@Render()
export class RenderEssentialLink extends BeanRenderBase {
  render() {
    return (
      <QItem
        clickable
        tag="a"
        target={this.$props.href ? '_blank' : undefined}
        href={this.$props.href}
        to={this.$props.to}
      >
        {
          <QItemSection avatar>
            <QIcon name={this.$props.icon} />
          </QItemSection>
        }
        <QItemSection>
          <QItemLabel>{this.$props.title}</QItemLabel>
          {this.$props.caption && <QItemLabel caption>{this.$props.caption}</QItemLabel>}
        </QItemSection>
      </QItem>
    );
  }
}
