import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { ApiBaseURL } from './openapi/index.js';

/** VonaTestUpload_fields */
export const ApiApiVonaTestUploadfieldsPath = '/api/vona/test/upload/fields';
export type ApiApiVonaTestUploadfieldsPath = '/api/vona/test/upload/fields';
export type ApiApiVonaTestUploadfieldsMethod = 'post';
export interface ApiApiVonaTestUploadfieldsRequestBody {
  /**
     * @description your name
     * @default zhennann
     */
  name?: object;
}
export type ApiApiVonaTestUploadfieldsResponseBody = paths[ApiApiVonaTestUploadfieldsPath][ApiApiVonaTestUploadfieldsMethod]['responses']['200']['content']['application/json']['data'];

/** VonaTestUpload_file */
export const ApiApiVonaTestUploadfilePath = '/api/vona/test/upload/file';
export type ApiApiVonaTestUploadfilePath = '/api/vona/test/upload/file';
export type ApiApiVonaTestUploadfileMethod = 'post';
export interface ApiApiVonaTestUploadfileRequestBody {
  /** @default zhennann */
  name?: object;
  /** Format: binary */
  welcome: object;
}
export type ApiApiVonaTestUploadfileResponseBody = paths[ApiApiVonaTestUploadfilePath][ApiApiVonaTestUploadfileMethod]['responses']['200']['content']['application/json']['data'];

/** VonaTestUpload_files */
export const ApiApiVonaTestUploadfilesPath = '/api/vona/test/upload/files';
export type ApiApiVonaTestUploadfilesPath = '/api/vona/test/upload/files';
export type ApiApiVonaTestUploadfilesMethod = 'post';
export interface ApiApiVonaTestUploadfilesRequestBody {
  /** Format: binary */
  welcome2: number;
  /**
     * Format: binary
     * @description single file
     */
  welcome1: number;
  /** @description more files */
  files: number[];
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
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  file(
    body: ApiApiVonaTestUploadfileRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiVonaTestUploadfileResponseBody>(
      ApiApiVonaTestUploadfilePath,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  files(
    body: ApiApiVonaTestUploadfilesRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiVonaTestUploadfilesResponseBody>(
      ApiApiVonaTestUploadfilesPath,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }
}
