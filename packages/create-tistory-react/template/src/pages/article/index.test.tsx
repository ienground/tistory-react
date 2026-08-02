import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test, vi } from 'vitest';
import ArticlePage from './index';

describe('게시글 상세 페이지', () => {
  test('상세 및 인덱스 치환자를 함께 렌더링한다', () => {
    vi.stubGlobal('React', React);
    const html = renderToStaticMarkup(<ArticlePage />);

    expect(html).toContain('<s_permalink_article_rep');
    expect(html).toContain('<s_index_article_rep');
  });
});
