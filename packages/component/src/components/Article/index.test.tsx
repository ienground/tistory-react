import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import {
  Article,
  ARTICLE_DESCRIPTION,
  ARTICLE_TITLE,
  RELATED_ARTICLE_TITLE,
} from './index';

describe('Article', () => {
  test('글 목록과 상세 영역을 각각의 티스토리 분기 치환자로 렌더링한다', () => {
    const html = renderToStaticMarkup(
      <Article>
        <Article.Index>{ARTICLE_TITLE}</Article.Index>
        <Article.Permalink>{ARTICLE_DESCRIPTION}</Article.Permalink>
      </Article>,
    );

    expect(html).toContain('<s_article_rep');
    expect(html).toContain('<s_index_article_rep');
    expect(html).toContain('<s_permalink_article_rep');
  });

  test('카테고리의 다른 글을 반복 치환자 내부에 렌더링한다', () => {
    const html = renderToStaticMarkup(
      <Article.Related>
        <ul>
          <Article.RelatedRep>
            <li><Article.RelatedLink>{RELATED_ARTICLE_TITLE}</Article.RelatedLink></li>
          </Article.RelatedRep>
        </ul>
      </Article.Related>,
    );

    expect(html).toContain('<s_article_related');
    expect(html).toContain('<s_article_related_rep');
    expect(html).toContain('href="[##_article_related_rep_link_##]"');
  });

  test('관련 글 썸네일 이미지 속성을 보존한다', () => {
    const html = renderToStaticMarkup(
      <Article.RelatedThumbnail>
        <Article.RelatedThumbnailImg className="related-thumbnail" />
      </Article.RelatedThumbnail>,
    );

    expect(html).toContain('class="related-thumbnail"');
  });
});
