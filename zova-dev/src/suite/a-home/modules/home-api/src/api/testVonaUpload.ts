import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestVonaUpload_fields */
export const ApiApiTestVonaUploadfieldsPath = '/api/test/vona/upload/fields';
export type ApiApiTestVonaUploadfieldsPath = '/api/test/vona/upload/fields';
export type ApiApiTestVonaUploadfieldsMethod = 'post';
export interface ApiApiTestVonaUploadfieldsRequestBody {
  checkes: string[];
  /**
     * @description your name
     * @default zhennann
     */
  name?: string;
}
export type ApiApiTestVonaUploadfieldsResponseBody = paths[ApiApiTestVonaUploadfieldsPath][ApiApiTestVonaUploadfieldsMethod]['responses']['200']['content']['application/json']['data'];

/** TestVonaUpload_file */
export const ApiApiTestVonaUploadfilePath = '/api/test/vona/upload/file';
export type ApiApiTestVonaUploadfilePath = '/api/test/vona/upload/file';
export type ApiApiTestVonaUploadfileMethod = 'post';
export interface ApiApiTestVonaUploadfileRequestBody {
  /** @default zhennann */
  name?: string;
  /** Format: binary */
  welcome: Blob;
}
export type ApiApiTestVonaUploadfileResponseBody = paths[ApiApiTestVonaUploadfilePath][ApiApiTestVonaUploadfileMethod]['responses']['200']['content']['application/json']['data'];

/** TestVonaUpload_files */
export const ApiApiTestVonaUploadfilesPath = '/api/test/vona/upload/files';
export type ApiApiTestVonaUploadfilesPath = '/api/test/vona/upload/files';
export type ApiApiTestVonaUploadfilesMethod = 'post';
export interface ApiApiTestVonaUploadfilesRequestBody {
  /** @description images */
  images: Blob[];
  /** Format: binary */
  welcome2: Blob;
  /**
     * Format: binary
     * @description single file
     */
  welcome1: Blob;
  /** @description more files */
  blobs: Blob[];
}
export type ApiApiTestVonaUploadfilesResponseBody = paths[ApiApiTestVonaUploadfilesPath][ApiApiTestVonaUploadfilesMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestVonaUpload extends BeanApiBase {
  fields(
    body: ApiApiTestVonaUploadfieldsRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestVonaUploadfieldsResponseBody>(
      ApiApiTestVonaUploadfieldsPath,
      this.$formData(body),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  file(
    body: ApiApiTestVonaUploadfileRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestVonaUploadfileResponseBody>(
      ApiApiTestVonaUploadfilePath,
      this.$formData(body),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  files(
    body: ApiApiTestVonaUploadfilesRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestVonaUploadfilesResponseBody>(
      ApiApiTestVonaUploadfilesPath,
      this.$formData(body),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }
}
