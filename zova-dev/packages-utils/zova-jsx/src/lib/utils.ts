export function isNativeElement(Component: any) {
  return (typeof Component === 'string' && !Component.includes(':') && Component.charAt(0) >= 'a' && Component.charAt(0) <= 'z');
}

export function isZovaComponent(Component: any) {
  return (typeof Component === 'string' && Component.includes(':'));
}

export function isLegacyComponent(Component: any) {
  return (typeof Component === 'string' && !Component.includes(':') && Component.charAt(0) >= 'A' && Component.charAt(0) <= 'Y');
}
