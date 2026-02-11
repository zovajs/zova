import { VBtn, VList, VListItem, VMenu } from 'vuetify/components';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { $iconName } from 'zova-module-a-icon';

@Render()
export class RenderLocale extends BeanRenderBase {
  public render() {
    const locales = [
      {
        name: 'en-us',
        title: this.scope.locale.LanguageEnglish(),
      },
      {
        name: 'zh-cn',
        title: this.scope.locale.LanguageChinese(),
      },
    ];
    const slots = {
      activator: ({ props }) => {
        return <VBtn icon={$iconName('::language')} variant="text" {...props}></VBtn>;
      },
    };
    return (
      <VMenu v-slots={slots}>
        <VList>
          {locales.map(item => {
            return (
              <VListItem
                key={item.name}
                value={item.name}
                title={item.title}
                disabled={this.app.meta.locale.current === item.name}
                prependIcon={$iconName(this.app.meta.locale.current === item.name ? '::done' : '::none')}
                onClick={() => {
                  this.app.meta.locale.current = item.name as any;
                }}
              ></VListItem>
            );
          })}
        </VList>
      </VMenu>
    );
  }
}
