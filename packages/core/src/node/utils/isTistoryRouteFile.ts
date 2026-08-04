export const DEFAULT_ROUTE_PATHS = [
  'main/index.',
  'article/index.',
  'tags/index.',
  'cover/index.',
  'protected/index.',
  'page/index.',
  'notice/index.',
  'local/index.',
  'guest/index.',
  'Layout.',
];

// TODO: require change logic
export function isTistoryRouteFile(routePath: string): boolean {
  return DEFAULT_ROUTE_PATHS.map(path => routePath.includes(path)).includes(
    true,
  );
}
