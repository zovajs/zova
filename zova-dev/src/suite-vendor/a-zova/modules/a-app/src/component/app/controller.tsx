import { RouterView } from '@cabloy/vue-router';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerApp extends BeanControllerBase {
  protected async __init__() {
    this.$useMeta(() => {
      return {
        title: this.sys.env.APP_TITLE,
        meta: {
          description: {
            name: 'description',
            content: this.sys.env.APP_DESCRIPTION,
          },
          viewport: {
            name: 'viewport',
            content: this.sys.env.APP_META_VIEWPORT,
          },
        },
        htmlAttr: {
          lang: this.app.meta.locale.current,
        },
      };
    });
  }

  protected render() {
    return <RouterView />;
  }
}
