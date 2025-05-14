import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestForm extends BeanRenderBase {
  private _renderSchema(schema: SchemaObject) {
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const key in properties) {
      // const property = properties[key];
      children.push(
        <input
          bs-formField={{
            name: key,
            validators: {
              onChange: z.string().min(3),
            },
          }}
        ></input>,
      );
    }
    return children;
  }

  public render() {
    if (!this.$props.schema) return;
    return (
      <form bs-form={{ form: this.form }}>
        {this._renderSchema(this.$props.schema)}
      </form>
    );
  }
}
