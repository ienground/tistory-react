import {
  Notice,
  NOTICE_DATE,
  NOTICE_DESCRIPTION,
  NOTICE_LINK,
  NOTICE_SUMMARY,
  NOTICE_THUMBNAIL_URL,
  NOTICE_TITLE,
} from '@ienlab/tistory-react/component/Notice';

export default function NoticePage() {
  return (
    <div className="page_notice_view">
      <Notice>
        <Notice.Index>
          <div className="list_index category_type_[##_var_listType_##] category_index_list">
            <div className="item_category">
              <a href={NOTICE_LINK} className="link_category">
                <Notice.Thumbnail>
                  <span
                    className="thumnail item-thumbnail"
                    style={{ backgroundImage: 'url("' + NOTICE_THUMBNAIL_URL + '")' }}
                  />
                </Notice.Thumbnail>
                <div className="info">
                  <strong className="name">{NOTICE_TITLE}</strong>
                  <p className="text summary">{NOTICE_SUMMARY}</p>
                  <span className="date">{NOTICE_DATE}</span>
                </div>
              </a>
            </div>
          </div>
        </Notice.Index>

        <Notice.Permalink>
          <div className="area_article">
            <div className="article_header">
              <h1 className="title_post">{NOTICE_TITLE}</h1>
              <p className="info">
                <span className="date">{NOTICE_DATE}</span>
              </p>
            </div>

            <div className="article_view">{NOTICE_DESCRIPTION}</div>
          </div>
        </Notice.Permalink>
      </Notice>
    </div>
  );
}
