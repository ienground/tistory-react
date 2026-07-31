import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import { Paging, PAGING_ITEM_NUMBER } from './index';

describe('Paging', () => {
  test('티스토리 페이지 이동 속성을 변환 가능한 임시 속성으로 렌더링한다', () => {
    const html = renderToStaticMarkup(
      <Paging>
        <li><Paging.Prev>이전</Paging.Prev></li>
        <Paging.Rep><Paging.Link>{PAGING_ITEM_NUMBER}</Paging.Link></Paging.Rep>
        <li><Paging.Next>다음</Paging.Next></li>
      </Paging>,
    );

    expect(html).toContain('<s_paging');
    expect(html).toContain('<s_paging_rep');
    expect(html).toContain('data-tistory-attribute="[##_prev_page_##]"');
    expect(html).toContain('data-tistory-attribute="[##_paging_rep_link_##]"');
    expect(html).toContain('data-tistory-attribute="[##_next_page_##]"');
  });
});
