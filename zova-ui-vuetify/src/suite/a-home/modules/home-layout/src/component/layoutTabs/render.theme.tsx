import { VBtn, VList, VListItem, VMenu } from 'vuetify/components';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { $icon, $iconName } from 'zova-module-a-icon';

@Render()
export class RenderTheme extends BeanRenderBase {
  renderThemeDark() {
    const themes = [
      {
        mode: false,
        title: this.scope.locale.ThemeLight(),
      },
      {
        mode: true,
        title: this.scope.locale.ThemeDark(),
      },
      {
        mode: 'auto',
        title: this.scope.locale.ThemeAuto(),
      },
    ];
    const slots = {
      activator: ({ props }) => {
        return <VBtn icon={$iconName('::dark-theme')} variant="text" {...props}></VBtn>;
      },
    };
    return (
      <VMenu v-slots={slots}>
        <ClientOnly>
          <VList>
            {themes.map(item => {
              return (
                <VListItem
                  key={item.mode.toString()}
                  value={item.mode}
                  title={item.title}
                  disabled={this.$theme.darkMode === item.mode}
                  prependIcon={$iconName(this.$theme.darkMode === item.mode ? '::done' : '::none')}
                  onClick={() => {
                    this.$theme.darkMode = item.mode as any;
                  }}
                ></VListItem>
              );
            })}
          </VList>
        </ClientOnly>
      </VMenu>
    );
  }

  renderThemeName() {
    const themes = [
      {
        name: 'home-base.theme.default',
        title: this.scope.locale.ThemeDefault(),
      },
      {
        name: 'demo-basic.theme.orange',
        title: this.scope.locale.ThemeOrange(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{$icon(':outline:theme-outline')}</summary>
          <ClientOnly>
            <ul class="bg-base-100 rounded-t-none p-2 w-48">
              {themes.map(item => {
                return (
                  <li key={item.name} class={this.$theme.name === item.name ? 'disabled' : ''}>
                    <a
                      onClick={() => {
                        this.$theme.name = item.name as any;
                      }}
                    >
                      {$icon(this.$theme.name === item.name ? '::done' : '::none')}
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </ClientOnly>
        </details>
      </li>
    );
  }
}
