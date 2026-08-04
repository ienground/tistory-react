export const DEFAULT_CONFIG_NAME = 'tistory-react.config' as const;

export const DEFAULT_EXTENSIONS = [
  '.js',
  '.ts',
  '.mjs',
  '.mts',
  '.cjs',
  '.cts',
] as const;

export const DEV_WATCH_IGNORED_GLOBS = [
  '**/build/**',
  '**/dist/**',
  '**/.tistory-react/**',
] as const;
