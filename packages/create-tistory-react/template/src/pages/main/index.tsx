import {
  List,
  LIST_DESCRIPTION,
  LIST_ITEM_DATE,
  LIST_ITEM_SUMMARY,
  LIST_ITEM_TITLE,
  LIST_TITLE,
} from '@ienlab/tistory-react/component/List';
import {
  Paging,
  PAGING_ITEM_NUMBER,
  PAGING_NO_MORE_NEXT,
  PAGING_NO_MORE_PREV,
} from '@ienlab/tistory-react/component/Paging';

export default function Main() {
  return (
    <div className="page_main_view">
      <List>
        <div className="area_category category_type_[##_var_listType_##] category_search_list">
          <h2 className="title_section">
            {LIST_TITLE}<span>([##_list_count_##])</span>
          </h2>
          <ul className="list_category">
            <List.Rep>
              <li className="item_category">
                <List.Link className="link_category">
                  <List.Thumbnail>
                    <span className="thumnail item-thumbnail" />
                  </List.Thumbnail>
                  <div className="info">
                    <strong className="name">{LIST_ITEM_TITLE}</strong>
                    <p className="text summary">{LIST_ITEM_SUMMARY}</p>
                    <span className="date">{LIST_ITEM_DATE}</span>
                  </div>
                </List.Link>
              </li>
            </List.Rep>
          </ul>
        </div>
      </List>

      <Paging>
        <div className="area_paging">
          <Paging.Prev className={"link_page link_prev " + PAGING_NO_MORE_PREV}>
            <span className="icon-Keyboard-Arrow---Left" />
          </Paging.Prev>
          <div className="paging_num thema_apply">
            <Paging.Rep>
              <Paging.Link className="link_num">{PAGING_ITEM_NUMBER}</Paging.Link>
            </Paging.Rep>
          </div>
          <Paging.Next className={"link_page link_next " + PAGING_NO_MORE_NEXT}>
            <span className="icon-Keyboard-Arrow---Right" />
          </Paging.Next>
        </div>
      </Paging>
    </div>
  );
}
