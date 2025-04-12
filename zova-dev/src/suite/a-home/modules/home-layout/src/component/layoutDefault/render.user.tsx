import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { iconh } from 'zova-module-a-icon';

@Render()
export class RenderUser extends BeanRenderBase {
  public render() {
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
