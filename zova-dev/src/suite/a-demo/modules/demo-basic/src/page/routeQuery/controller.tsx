import { BeanControllerPageBase, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';

export const ControllerPageRouteQuerySchemaParams = zz.object({});

export const ControllerPageRouteQuerySchemaQuery = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});

@Controller()
export class ControllerPageRouteQuery extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
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
                <td>$query.name</td>
                <td>{this.$query.name}</td>
                <td>{typeof this.$query.name}</td>
              </tr>
              <tr>
                <td>$query.age</td>
                <td>{this.$query.age}</td>
                <td>{typeof this.$query.age}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-primary"
            onClick={() => {
              const name = this.$query.name === 'tom' ? 'kevin' : 'tom';
              const age = (this.$query.age ?? 0) + 1;
              const url = this.$router.resolvePath('/demo/basic/routeQuery', {
                name,
                age,
              });
              this.$router.push(url);
            }}
          >
            Go to current page with different query value
          </button>
        </div>
      </ZPage>
    );
  }
}
