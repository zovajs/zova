import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleRouteParams } from './style.js';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderRouteParams extends BeanRenderBase {
  public render() {
    return (
      <ZPage>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$params.id</td>
                <td>{this.$params.id}</td>
                <td>{typeof this.$params.id}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-primary"
            onClick={() => {
              const id = this.$params.id + 1;
              const url = this.$router.resolveName('demo-basic:routeParams', {
                params: { id },
              });
              this.$router.push(url);
            }}
          >
            Go to current page with different params value
          </button>
        </div>
      </ZPage>
    );
  }
}
