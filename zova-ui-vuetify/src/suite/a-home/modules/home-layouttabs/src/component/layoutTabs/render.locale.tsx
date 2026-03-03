import { VBtn, VList, VListItem, VMenu } from 'vuetify/components';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { $iconName } from 'zova-module-a-icon';
import { $useLocale } from '../../.metadata/locales.js';

@Render()
export class RenderLocale extends BeanRenderBase {
  private textLanguageEnglish: string;
  private textLanguageChinese: string;

  protected async __init__() {
    this.textLanguageEnglish = $useLocale('LanguageEnglish');
    this.textLanguageChinese = $useLocale('LanguageChinese');
  }

  public render() {
    const locales = [
      {
        name: 'en-us',
        title: this.textLanguageEnglish,
      },
      {
        name: 'zh-cn',
        title: this.textLanguageChinese,
      },
    ];
    const slots = {
      activator: ({ props }) => {
        return <VBtn icon={$iconName('::language')} variant="text" {...props}></VBtn>;
      },
    };
    return (
      <VMenu v-slots={slots}>
        <ClientOnly>
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
        </ClientOnly>
      </VMenu>
    );
  }
}
