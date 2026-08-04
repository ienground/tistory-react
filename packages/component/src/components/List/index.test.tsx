import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import {
  List,
  LIST_CATEGORY,
  LIST_DESCRIPTION,
  LIST_ITEM_DATE,
  LIST_ITEM_SUMMARY,
  LIST_ITEM_TITLE,
  LIST_TITLE,
} from './index';

describe('List', () => {
  test('티스토리 목록 그룹과 반복 항목 치환자를 렌더링한다', () => {
    const html = renderToStaticMarkup(
      <List>
        <header>
          <h1>{LIST_TITLE}</h1>
          <p>{LIST_DESCRIPTION}</p>
        </header>
        <List.Rep>
          <List.Thumbnail>
            <List.ThumbnailImg />
          </List.Thumbnail>
          <List.Link>{LIST_ITEM_TITLE}</List.Link>
          <List.CategoryLink>{LIST_CATEGORY}</List.CategoryLink>
          <time>{LIST_ITEM_DATE}</time>
          <p>{LIST_ITEM_SUMMARY}</p>
        </List.Rep>
      </List>,
    );

    expect(html).toContain('<s_list');
    expect(html).toContain('<s_list_rep');
    expect(html).toContain('<s_list_rep_thumbnail');
    expect(html).toContain('href="[##_list_rep_link_##]"');
    expect(html).toContain('src="[##_list_rep_thumbnail_##]"');
    expect(html).toContain('href="[##_list_rep_category_link_##]"');
  });
});
