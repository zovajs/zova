import { QIcon, QItem, QItemLabel, QItemSection } from 'quasar';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IIconRecord,  } from 'zova-module-a-icon';

export interface ControllerEssentialLinkProps {
  title: string;
  description?: string;
  icon?: keyof IIconRecord;
  href?: string;
  to?: string | object;
}

@Controller()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    description: '',
    icon: '',
  };

  _renderLink() {
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
          {this.$props.description && <QItemLabel caption>{this.$props.description}</QItemLabel>}
        </QItemSection>
      </QItem>
    );
  }

  protected render() {
    return this._renderLink();
  }
}
