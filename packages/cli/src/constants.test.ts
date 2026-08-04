import { describe, expect, test } from 'vitest';

import * as constants from './constants';

describe('dev watcher', () => {
  test('build 생성물 디렉터리를 감시 대상에서 제외한다', () => {
    expect(
      (constants as Record<string, unknown>).DEV_WATCH_IGNORED_GLOBS,
    ).toEqual(['**/build/**', '**/dist/**', '**/.tistory-react/**']);
  });
});
