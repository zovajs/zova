import type { ViteDevServer } from 'vite';
import { ViteNodeRunner } from 'vite-node/client';
import { ViteNodeServer } from 'vite-node/server';
export declare class ViteNode {
    server: ViteDevServer;
    serverEntryFile: string;
    node: ViteNodeServer;
    runner: ViteNodeRunner;
    renderApp: any;
    static invalidates: Set<string>;
    constructor(server: ViteDevServer, serverEntryFile: string);
    attachServer(): Promise<ViteNodeServer>;
    createRunner(): ViteNodeRunner;
    loadRender(): Promise<any>;
}
