import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { RouterLink } from 'vue-router';

@Render()
export class RenderPageErrorNotFound extends BeanRenderBase {
  public render() {
    return (
      <div class="text-center">
        <div>
          <div class={this.cTitle}>404</div>

          <div class={this.cDescription}>Oops. Nothing here...</div>

          <RouterLink to="/">Go Home</RouterLink>
        </div>
      </div>
    );
  }
}
