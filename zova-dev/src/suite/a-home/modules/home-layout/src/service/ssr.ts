import { BeanBase, UseScope } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

@Service()
export class ServiceSsr extends BeanBase {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  protected async __init__() {
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        if (!this.$$scopeSsr.config.cookieTheme) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.setAttribute('data-theme', window.ssr_themedark_data);
            if(window.ssr_local_themename==='demo-basic.theme.orange'){
              document.body.style.setProperty('--color-primary', '#f28238');
            }
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
      });
    }
  }
}
