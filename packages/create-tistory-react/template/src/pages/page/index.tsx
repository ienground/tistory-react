import { Page } from '@ienlab/tistory-react/component/Page';
import {
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_TITLE,
} from '@ienlab/tistory-react/component/Article';

export default function StaticPage() {
  return (
    <Page>
      <div className="area_article area_static_page page_page_view">
        <div className="article_header">
          <h1 className="title_post">{ARTICLE_TITLE}</h1>
          <p className="info">
            <span className="date">{ARTICLE_DATE}</span>
          </p>
        </div>
        <div className="article_view">{ARTICLE_DESCRIPTION}</div>
      </div>
    </Page>
  );
}
