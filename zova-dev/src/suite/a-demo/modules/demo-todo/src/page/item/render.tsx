import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleItem } from './style.js';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderPageItem extends BeanRenderBase {
  render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <ZPage>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-info">
            <div>Current: {todoCurrent?.data?.title}</div>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
      </ZPage>
    );
  }
}
