import { afterEach, describe, expect, test, vi } from 'vitest';

import { removeAllTistoryTags } from './removeAllTistoryTags';

describe('removeAllTistoryTags', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('React root가 연결되기 전 태그 wrapper를 replaceWith로 평탄화한다', () => {
    const child = { id: 'child' };
    let receivedSelector = '';
    let replacedNodes: unknown[] = [];
    const tistoryElement = {
      childNodes: [child],
      replaceWith: (...nodes: unknown[]) => {
        replacedNodes = nodes;
      },
    };

    vi.stubGlobal('document', {
      querySelectorAll: (selector: string) => {
        receivedSelector = selector;
        return [tistoryElement];
      },
    });

    removeAllTistoryTags();

    expect(receivedSelector).toBe('[data-is-tistory-tag]');
    expect(replacedNodes).toEqual([child]);
  });
});
