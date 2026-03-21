import type { TableIdentity } from 'table-identity';
import type { DataMutation, IDecoratorModelOptions } from 'zova-module-a-model';
import type { IOpenapiOptionsResourceMeta, ITableQuery, ITableRes, ScopeModuleAOpenapi, TypeOpenapiPermissions } from 'zova-module-a-openapi';

import { hashkey, isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { deepExtend, UseScope } from 'zova';
import { formSceneFromFormMeta, IFormMeta, IFormProvider } from 'zova-module-a-form';
import { $QueryAutoLoad, BeanModelBase, Model } from 'zova-module-a-model';
import { SymbolOpenapiSchemaName } from 'zova-module-a-openapi';
import { ITableProvider } from 'zova-module-a-table';

export interface IModelOptionsResource extends IDecoratorModelOptions {}

@Model<IModelOptionsResource>({
  enableSelector: true,
})
export class ModelResource<Entity = any, EntityCreate = Partial<Entity>, EntityUpdate = Partial<Entity>> extends BeanModelBase {
  public resource: string;
  public resourceApi: string;
  public resourceMeta: IOpenapiOptionsResourceMeta;
  public permissions?: TypeOpenapiPermissions;
  public formProvider: IFormProvider;
  public tableProvider: ITableProvider;
  public schemaView?: SchemaObject;
  public schemaCreate?: SchemaObject;
  public schemaUpdate?: SchemaObject;
  public schemaFilter?: SchemaObject;
  public schemaRow?: SchemaObject;
  public schemaPages?: SchemaObject;

  @UseScope('a-openapi')
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__(resource: string) {
    if (!resource) throw new Error('resource not specified');
    await super.__init__(resource);
    this.resource = resource;
    // resourceMeta
    this.resourceMeta = this.$useComputed(() => {
      const resourceMeta = this.$sdk.getBootstrap(this.resource);
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.resourceMeta, resourceMeta.data?.resourceMeta);
    });
    this.permissions = this.$useComputed(() => {
      const permissions = this.$sdk.getPermissions(this.resource);
      return permissions.data;
    });
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.resourceMeta.provider, this.resourceMeta.form?.provider);
    });
    this.tableProvider = this.$useComputed(() => {
      return deepExtend({}, this.resourceMeta.provider, this.resourceMeta.table?.provider);
    });
    this.schemaView = this.$useComputed(() => {
      return this.apiSchemasView.responseBody;
    });
    this.schemaCreate = this.$useComputed(() => {
      return this.apiSchemasCreate.requestBody;
    });
    this.schemaUpdate = this.$useComputed(() => {
      return this.apiSchemasUpdate.requestBody;
    });
    this.schemaFilter = this.$useComputed(() => {
      return this.apiSchemasSelect.filter;
    });
    this.schemaRow = this.$useComputed(() => {
      return this.apiSchemasSelect.row;
    });
    this.schemaPages = this.$useComputed(() => {
      return this.apiSchemasSelect.paged;
    });
    // bootstrap
    await this._bootstrap();
  }

  selectGeneral(actionPath?: string, query?: ITableQuery) {
    const queryHash = hashkey(query);
    return this.$useStateData({
      queryKey: ['select', actionPath ?? '', queryHash],
      queryFn: async () => {
        const apiPath = actionPath ? `${this.resourceApi}/${actionPath}` : this.resourceApi;
        return this.$fetch.get<any, ITableRes<Entity>>(
          this.sys.util.apiActionPathTranslate(apiPath),
          this.sys.util.apiActionConfigPrepare(undefined, { query }),
        );
      },
    });
  }

  select(query?: ITableQuery) {
    return this.selectGeneral(undefined, query);
  }

  view(id: TableIdentity) {
    if (isNil(id)) throw new Error('row id cannot empty');
    return this.$useStateData({
      queryKey: ['get', id],
      queryFn: async () => {
        const res = await this.$fetch.get<any, Entity>(
          this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, { id }),
          this.sys.util.apiActionConfigPrepare(),
        );
        return res ?? null;
      },
    });
  }

  create() {
    return this.$useMutationData<void, EntityCreate>({
      mutationKey: ['create'],
      mutationFn: async params => {
        return this.$fetch.post<any, void, EntityCreate>(
          this.sys.util.apiActionPathTranslate(this.resourceApi),
          params,
          this.sys.util.apiActionConfigPrepare(),
        );
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
      },
    });
  }

  update(id: TableIdentity) {
    return this.$useMutationData<void, EntityUpdate>({
      mutationKey: ['update', id],
      mutationFn: async params => {
        return this.$fetch.patch<any, void, EntityUpdate>(
          this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, { id }),
          params,
          this.sys.util.apiActionConfigPrepare(),
        );
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', id] });
      },
    });
  }

  delete(id: TableIdentity) {
    return this.$useMutationData<void, void>({
      mutationKey: ['delete', id],
      mutationFn: async () => {
        return this.$fetch.delete<any, void, void>(
          this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, { id }),
          this.sys.util.apiActionConfigPrepare(),
        );
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', id] });
      },
    });
  }

  public get apiSchemasSelect() {
    return this.$sdk.createApiSchemas(this.resourceApi, 'get');
  }

  public get apiSchemasView() {
    return this.$sdk.createApiSchemas(`${this.resourceApi}/:id`, 'get');
  }

  public get apiSchemasCreate() {
    return this.$sdk.createApiSchemas(this.resourceApi, 'post');
  }

  public get apiSchemasUpdate() {
    return this.$sdk.createApiSchemas(`${this.resourceApi}/:id`, 'patch');
  }

  public get componentRestPage() {
    return this.resourceMeta.provider!.components!.restPage!;
  }

  public get componentRestPageEntry() {
    return this.resourceMeta.provider!.components!.restPageEntry!;
  }

  public get componentTable() {
    return this.resourceMeta.provider!.components!.table!;
  }

  public get componentForm() {
    return this.resourceMeta.provider!.components!.form!;
  }

  public getFormSchema(formMeta: IFormMeta) {
    const formScene = formMeta.formScene ?? formSceneFromFormMeta(formMeta);
    if (formScene === 'view') return this.schemaView;
    if (formScene === 'create') return this.schemaCreate;
    if (formScene === 'edit') return this.schemaUpdate;
  }

  public getFormApiSchemas(formMeta: IFormMeta) {
    const formScene = formMeta.formScene ?? formSceneFromFormMeta(formMeta);
    if (formScene === 'view') return this.apiSchemasView;
    if (formScene === 'create') return this.apiSchemasCreate;
    if (formScene === 'edit') return this.apiSchemasUpdate;
    throw new Error('invalid parameters');
  }

  public getFormMutationSubmit(formMeta: IFormMeta, id?: TableIdentity): DataMutation | undefined {
    if (formMeta.formMode !== 'edit') return;
    if (formMeta.editMode === 'create') {
      return this.create() as any;
    } else if (formMeta.editMode === 'update') {
      return this.update(id!) as any;
    }
  }

  public getFormData(formMeta: IFormMeta, id?: TableIdentity): Entity | EntityCreate | EntityUpdate | undefined {
    if (formMeta.formMode === 'edit' && formMeta.editMode === 'create') {
      return this.getQueryDataDefaultValue(this.schemaCreate);
    }
    if (isNil(id)) return undefined;
    return this.view(id).data as Entity | EntityUpdate | undefined;
  }

  public getQueryDataDefaultValue(schemaName?: SchemaObject | string): EntityCreate | undefined {
    if (!schemaName) return;
    if (typeof schemaName === 'object') {
      schemaName = schemaName[SymbolOpenapiSchemaName] as string;
    }
    return this.$sdk.getSchemaDefaultValue(schemaName) as EntityCreate | undefined;
  }

  private async _bootstrap() {
    const queryBootstrap = await $QueryAutoLoad(() => this.$sdk.getBootstrap(this.resource));
    if (!queryBootstrap?.data) {
      throw new Error(`not found sdk of resource: ${this.resource}`);
    }
    this.resourceApi = this.sys.util.parseResourceApi(this.resource, queryBootstrap.data.apiPath);
  }
}
