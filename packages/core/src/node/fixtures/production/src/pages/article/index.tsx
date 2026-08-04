import {
  ARTICLE_LINK,
  Article,
  NEXT_LINK,
  PREV_LINK,
  RELATED_ARTICLE_LINK,
} from '@ienlab/tistory-react-component/Article';
import { createElement } from 'react';

export default function ArticlePage() {
  return (
    <Article>
      {createElement(
        's_permalink_article_rep',
        { 'data-is-tistory-tag': true },
        <div data-production-content="article">
          <Article.ArticleLink>{ARTICLE_LINK}</Article.ArticleLink>
        </div>,
      )}
      {createElement(
        's_index_article_rep',
        { 'data-is-tistory-tag': true },
        <div data-production-content="article-list">
          <Article.ArticleLink>{ARTICLE_LINK}</Article.ArticleLink>
        </div>,
      )}
      <Article.Related>
        <Article.RelatedLink>{RELATED_ARTICLE_LINK}</Article.RelatedLink>
      </Article.Related>
      <Article.Prev>
        <Article.PrevLink>{PREV_LINK}</Article.PrevLink>
      </Article.Prev>
      <Article.Next>
        <Article.NextLink>{NEXT_LINK}</Article.NextLink>
      </Article.Next>
    </Article>
  );
}
