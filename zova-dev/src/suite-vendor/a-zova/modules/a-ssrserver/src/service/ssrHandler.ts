import type http from 'node:http';
import path, { basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import fse from 'fs-extra';
import { BeanBase, cast, ZovaConfigEnv } from 'zova';
import { Service } from 'zova-module-a-bean';
import { TypeEventGetFullPathResult } from '../types/ssr.js';

@Service()
export class ServiceSsrHandler extends BeanBase {
  private _siteEnv: any;
  private _siteAssetDir: string;
  private _handlerPromise: Promise<any>;
  private _handlerInstance: any;
  private _zovaSys: any;
  private _clientManifest: any;
  private _ssrModulesZovaCache: any = {};

  protected __init__(siteEnv: any, siteAssetDir: string) {
    this._siteEnv = siteEnv;
    this._siteAssetDir = siteAssetDir;
  }

  public dispose() {
    this._handlerInstance = undefined;
    this._zovaSys = undefined;
  }

  async getFullPath(filename: string): Promise<TypeEventGetFullPathResult> {
    if (filename === '') filename = 'index';
    // assets
    let fileAsset = path.join(this._siteAssetDir, 'client', filename);
    if (await fse.exists(fileAsset)) return fileAsset;
    // ssg
    fileAsset = path.join(this._siteAssetDir, 'client', filename, '.html');
    if (await fse.exists(fileAsset)) return fileAsset;
    // not found
    return undefined;
  }

  public async render(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
    // resolve route
    const route = await this._zovaSys.meta.ssr.resolveRoute(req.url, true, false);
    if (!route) return;
    // handler
    const { serverEntry, renderToString, renderTemplate } = this._handlerInstance;
    // ssrContext
    const onRenderedList: Function[] = [];
    const ssrContext = {
      req,
      res,
      _meta: {} as any,
      onRendered: fn => { onRenderedList.push(fn); },
    };
    // render
    const renderFn = await serverEntry(ssrContext);
    const runtimePageContent = await renderToString(renderFn, ssrContext);

    onRenderedList.forEach(fn => {
      fn();
    });

    // maintain compatibility with some well-known Vue plugins
    // like @vue/apollo-ssr:
    typeof cast(ssrContext).rendered === 'function' && cast(ssrContext).rendered();

    ssrContext._meta.runtimePageContent = runtimePageContent;

    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    ssrContext._meta.endingHeadTags += this._renderModulesPreload_zova(cast(ssrContext).modules, { ssrContext });
    ssrContext._meta.endingHeadTags += this._renderModulesPreload(cast(ssrContext).modules, { ssrContext });

    const html = renderTemplate(ssrContext);

    // todo: ssg

    return html;
  }

  public async ensureReady() {
    if (!this._handlerInstance) {
      if (!this._handlerPromise) {
        this._handlerPromise = this._prepareHandler();
      }
      this._handlerInstance = await this._handlerPromise;
    }
    return this._handlerInstance;
  }

  private async _prepareHandler() {
    // handler
    const fileHandler = path.join(this._siteAssetDir, 'handler.js');
    const handlerInstance = await import(pathToHref(fileHandler));
    // initialize
    this._zovaSys = await handlerInstance.initialize(this._siteEnv);
    // clientManifest
    const fileManifest = path.join(this._siteAssetDir, 'quasar.manifest.json');
    const contentManifest = await fse.readFile(fileManifest, { encoding: 'utf-8' });
    this._clientManifest = JSON.parse(contentManifest);
    // ok
    return handlerInstance;
  }

  private _renderModulesPreload(modules, opts) {
    let links = '';
    const seen = new Set();

    modules.forEach(id => {
      const files = this._clientManifest[id];
      if (files === void 0) return;

      files.forEach(file => {
        if (seen.has(file) === true) return;

        seen.add(file);
        const filename = basename(file);

        if (this._clientManifest[filename] !== void 0) {
          for (const depFile of this._clientManifest[filename]) {
            if (seen.has(depFile) === false) {
              links += renderPreloadTag(depFile, opts);
              seen.add(depFile);
            }
          }
        }

        links += renderPreloadTag(file, opts);
      });
    });

    return links;
  }

  private _renderModulesPreload_zova(modules2, opts) {
    let links = '';
    const seen = /* @__PURE__ */ new Set();
    modules2.forEach(id => {
      if (!id.startsWith('@@')) return;
      if (seen.has(id) === true) return;
      let cache = this._ssrModulesZovaCache[id];
      if (!cache) {
        for (const key in this._clientManifest) {
          const prefix = `${id.substring(2)}-`;
          const postfix = '.js';
          if (key.startsWith(prefix) && key.endsWith(postfix)) {
            cache = this._resolveUrlPath(`/assets/${key}`);
            break;
          }
        }
        this._ssrModulesZovaCache[id] = cache;
      }
      links += renderPreloadTag(cache, opts);
      seen.add(id);
    });
    return links;
  }

  private _resolveUrlPath(url: string) {
    const env: ZovaConfigEnv = this._zovaSys.env;
    let publicPath = env.APP_PUBLIC_PATH;
    if (publicPath) publicPath = `/${publicPath}`;
    return publicPath + url;
  }
}

const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

function renderPreloadTag(file, _opts) {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}" crossorigin>`;
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif" crossorigin>`;
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg" crossorigin>`;
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png" crossorigin>`;
  }

  return '';
};

export function pathToHref(fileName: string): string {
  return pathToFileURL(fileName).href;
  // return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
}
