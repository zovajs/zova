declare global {
  interface Window {
    ssr_load_local<T>(key: string): T | undefined;
    ssr_local_themedark: boolean;
    ssr_local_themename?: string;
  }
}
export {};