export function assetUrl(path: string): string {
  const base = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
