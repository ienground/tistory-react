import { Page } from '@ienlab/tistory-react/component/Page';
import {
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_TITLE,
} from '@ienlab/tistory-react/component/Article';

export default function StaticPage() {
  return (
    <Page>
      <div className="area_article">
        <div className="article_header">
          <div className="inner_header" style={{ backgroundImage: "url('')" }}>
            <div className="info_text">
              <strong className="title_post">{ARTICLE_TITLE}</strong>
              <p className="info">
                <span className="date">{ARTICLE_DATE}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="article_view">{ARTICLE_DESCRIPTION}</div>
      </div>
    </Page>
  );
}
