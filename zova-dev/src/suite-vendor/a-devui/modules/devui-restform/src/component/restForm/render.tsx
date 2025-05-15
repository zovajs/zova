import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IBehaviorItem } from 'zova-module-a-behavior';

@Render()
export class RenderRestForm extends BeanRenderBase {
  private _renderSchema(schema: SchemaObject) {
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const key in properties) {
      const property = properties[key];
      const behaviors: IBehaviorItem = {
        'devui-restform:formFieldLayout': { label: property.description || key },
        'a-form:formField': {
          name: key,
          validators: {
            onChange: z.string().min(3),
          },
        },
      };
      children.push(
        <input behaviors={behaviors}></input>,
      );
    }
    return children;
  }

  public render() {
    if (!this.$props.schema) return;
    return (
      <form bs-form={{ form: this.form }}>
        <>{this._renderSchema(this.$props.schema)}</>
      </form>
    );
  }
}
