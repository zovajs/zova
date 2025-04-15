import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { ApiBaseURL } from './openapi/index.js';

/** VonaTestUpload_fields */
export const ApiApiVonaTestUploadfieldsPath = '/api/vona/test/upload/fields';
export type ApiApiVonaTestUploadfieldsPath = '/api/vona/test/upload/fields';
export type ApiApiVonaTestUploadfieldsMethod = 'post';
export interface ApiApiVonaTestUploadfieldsRequestBody {
  checkes: string[];
  /**
     * @description your name
     * @default zhennann
     */
  name?: string;
}
export type ApiApiVonaTestUploadfieldsResponseBody = paths[ApiApiVonaTestUploadfieldsPath][ApiApiVonaTestUploadfieldsMethod]['responses']['200']['content']['application/json']['data'];

/** VonaTestUpload_file */
export const ApiApiVonaTestUploadfilePath = '/api/vona/test/upload/file';
export type ApiApiVonaTestUploadfilePath = '/api/vona/test/upload/file';
export type ApiApiVonaTestUploadfileMethod = 'post';
export interface ApiApiVonaTestUploadfileRequestBody {
  /** @default zhennann */
  name?: string;
  /** Format: binary */
  welcome: Blob;
}
export type ApiApiVonaTestUploadfileResponseBody = paths[ApiApiVonaTestUploadfilePath][ApiApiVonaTestUploadfileMethod]['responses']['200']['content']['application/json']['data'];

/** VonaTestUpload_files */
export const ApiApiVonaTestUploadfilesPath = '/api/vona/test/upload/files';
export type ApiApiVonaTestUploadfilesPath = '/api/vona/test/upload/files';
export type ApiApiVonaTestUploadfilesMethod = 'post';
export interface ApiApiVonaTestUploadfilesRequestBody {
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
export type ApiApiVonaTestUploadfilesResponseBody = paths[ApiApiVonaTestUploadfilesPath][ApiApiVonaTestUploadfilesMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiVonaTestUpload extends BeanApiBase {
  fields(
    body: ApiApiVonaTestUploadfieldsRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiVonaTestUploadfieldsResponseBody>(
      ApiApiVonaTestUploadfieldsPath,
      this.$formData(body),
      this.$configPrepare(ApiBaseURL(this.sys), options),
    );
  }

  file(
    body: ApiApiVonaTestUploadfileRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiVonaTestUploadfileResponseBody>(
      ApiApiVonaTestUploadfilePath,
      this.$formData(body),
      this.$configPrepare(ApiBaseURL(this.sys), options),
    );
  }

  files(
    body: ApiApiVonaTestUploadfilesRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiVonaTestUploadfilesResponseBody>(
      ApiApiVonaTestUploadfilesPath,
      this.$formData(body),
      this.$configPrepare(ApiBaseURL(this.sys), options),
    );
  }
}
