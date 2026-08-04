import {
  CoverGroup,
  COVER_ITEM_DATE,
  COVER_ITEM_SUMMARY,
  COVER_ITEM_THUMBNAIL,
  COVER_ITEM_TITLE,
  COVER_ITEM_URL,
  COVER_TITLE,
} from '@ienlab/tistory-react/component/Cover';

export default function CoverPage() {
  return (
    <CoverGroup>
      <div className="area_cover page_cover_view">
        <CoverGroup.Rep>
          <CoverGroup.Cover name="featured">
            <div className="type_featured">
              <div className="slide_zone">
                <CoverGroup.Item>
                  <div className="slide_item">
                    <div
                      className="link_slide item-thumbnail"
                      style={{ backgroundImage: 'url("' + COVER_ITEM_THUMBNAIL + '")' }}
                    >
                      <CoverGroup.ItemThumbnail>{COVER_ITEM_THUMBNAIL}</CoverGroup.ItemThumbnail>
                      <div className="text_slide thema_apply">
                        <strong id="cover_item_title">{COVER_ITEM_TITLE}</strong>
                        <div className="text" id="cover_item_summary">{COVER_ITEM_SUMMARY}</div>
                        <a href={COVER_ITEM_URL} className="link_detail">
                          <span className="material-icons-round">adjust</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CoverGroup.Item>
              </div>
              <div className="box_arrow thema_apply">
                <button type="button" className="btn_arrow btn_prev"><span className="blind">왼쪽</span></button>
                <button type="button" className="btn_arrow btn_next"><span className="blind">오른쪽</span></button>
              </div>
            </div>
          </CoverGroup.Cover>

          <CoverGroup.Cover name="post">
            <div className="type_post">
              <h2 className="title_section">{COVER_TITLE}</h2>
              <ul className="list_post">
                <CoverGroup.Item>
                  <li className="item_post">
                    <a
                      href={COVER_ITEM_URL}
                      className="link_post item-thumbnail"
                      style={{ backgroundImage: 'url("' + COVER_ITEM_THUMBNAIL + '")' }}
                    >
                      <CoverGroup.ItemThumbnail>{COVER_ITEM_THUMBNAIL}</CoverGroup.ItemThumbnail>
                      <div className="info">
                        <strong className="name">{COVER_ITEM_TITLE}</strong>
                        <CoverGroup.ItemArticleInfo>
                          <span className="date">{COVER_ITEM_DATE}</span>
                        </CoverGroup.ItemArticleInfo>
                      </div>
                    </a>
                  </li>
                </CoverGroup.Item>
              </ul>
            </div>
          </CoverGroup.Cover>

          <CoverGroup.Cover name="card">
            <div className="type_card">
              <h2 className="title_section">{COVER_TITLE}</h2>
              <ul className="list_type_card">
                <CoverGroup.Item>
                  <li className="item_card">
                    <a href={COVER_ITEM_URL} className="link_card">
                      <CoverGroup.ItemThumbnail>
                        <span
                          className="thumnail item-thumbnail"
                          style={{ backgroundImage: 'url("' + COVER_ITEM_THUMBNAIL + '")' }}
                        />
                      </CoverGroup.ItemThumbnail>
                      <strong>{COVER_ITEM_TITLE}</strong>
                      <p className="text">{COVER_ITEM_SUMMARY}</p>
                    </a>
                  </li>
                </CoverGroup.Item>
              </ul>
            </div>
          </CoverGroup.Cover>

          <CoverGroup.Cover name="banner">
            <div className="type_banner">
              <h2 className="title_section">{COVER_TITLE}</h2>
              <ul className="list_type_banner">
                <CoverGroup.Item>
                  <li className="item_banner">
                    <a
                      href={COVER_ITEM_URL}
                      className="link_banner item-thumbnail"
                      style={{ backgroundImage: 'url("' + COVER_ITEM_THUMBNAIL + '")' }}
                    >
                      <CoverGroup.ItemThumbnail>{COVER_ITEM_THUMBNAIL}</CoverGroup.ItemThumbnail>
                      <div className="box_content">
                        <strong>{COVER_ITEM_TITLE}</strong>
                        <p className="text">{COVER_ITEM_SUMMARY}</p>
                        <button className="btn_go">go</button>
                      </div>
                    </a>
                  </li>
                </CoverGroup.Item>
              </ul>
            </div>
          </CoverGroup.Cover>

          <CoverGroup.Cover name="notice">
            <div className="type_notice">
              <h2 className="title_section">{COVER_TITLE}</h2>
              <ul className="list_type_notice">
                <CoverGroup.Item>
                  <li className="item_notice">
                    <a href={COVER_ITEM_URL} className="link_notice">
                      <CoverGroup.ItemThumbnail>
                        <span
                          className="thumnail item-thumbnail"
                          style={{ backgroundImage: 'url("' + COVER_ITEM_THUMBNAIL + '")' }}
                        />
                      </CoverGroup.ItemThumbnail>
                      <div className="info">
                        <strong>{COVER_ITEM_TITLE}</strong>
                        <p className="text">{COVER_ITEM_SUMMARY}</p>
                        <CoverGroup.ItemArticleInfo>
                          <span className="date">{COVER_ITEM_DATE}</span>
                        </CoverGroup.ItemArticleInfo>
                      </div>
                    </a>
                  </li>
                </CoverGroup.Item>
              </ul>
            </div>
          </CoverGroup.Cover>
        </CoverGroup.Rep>
      </div>
    </CoverGroup>
  );
}
