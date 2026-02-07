import { BeanBase, UseScope } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

@Service()
export class ServiceLayoutEmptySsr extends BeanBase {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  protected async __init__() {
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        if (!this.$$scopeSsr.config.cookieTheme) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.classList.remove('body--light','body--dark');
            window.ssr_themedark_data.split(',').forEach(item=>document.body.classList.add(item));
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
        if (this.$$scopeSsr.config.optimization.bodyReadyObserver) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  window.ssr_body_ready_handler=()=>{
    const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
    if(window.ssr_themedark){
      if(__domPageContainer){
        const __domCards=__domPageContainer.querySelectorAll('.q-card');
        __domCards.forEach(item=>item.classList.add('q-card--dark','q-dark'));
        const __domFields=__domPageContainer.querySelectorAll('.q-field');
        __domFields.forEach(item=>item.classList.add('q-field--dark'));
      }
    }
  };
  window.ssr_body_ready_condition=()=>{
    const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
    const __domPlaceholder=document.querySelector('.__placeholder__');
    return __domPageContainer && __domPlaceholder;
  };
  window.ssr_body_ready_callback=()=>{
    window.ssr_body_ready_handler();
    document.querySelector('#__leftDrawerOpenJS').remove();
  };
</script>`.replaceAll('\n', '');
        }
      });
    }
  }
}
