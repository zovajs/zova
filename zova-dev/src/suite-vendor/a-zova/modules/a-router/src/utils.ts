export function getRealRouteName(name?: string | symbol | null): string | undefined {
  if (!name) return undefined;
  name = String(name);
  if (name.startsWith('$:')) return undefined;
  return name;
}

export function isRouterName(name?: string): boolean {
  return !!name && name.includes(':') && !name.includes('/');
}
