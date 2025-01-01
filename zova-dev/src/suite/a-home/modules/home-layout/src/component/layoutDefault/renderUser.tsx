import { BeanRenderBase, Local, iconh } from 'zova';
import { StyleLayoutDefault } from './style.js';

export interface RenderUser extends StyleLayoutDefault {}

@Local()
export class RenderUser extends BeanRenderBase {
  render() {
    return (
      <li>
        <details>
          <summary>
            {this.$$modelUser.user?.username}
            {iconh(this.$$modelUser.user?.avatar as any)}
          </summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-32">
            <li>
              <a
                onClick={() => {
                  this.$$modelAuth.logout().mutate();
                }}
              >
                {this.scope.locale.Logout()}
              </a>
            </li>
          </ul>
        </details>
      </li>
    );
  }
}
