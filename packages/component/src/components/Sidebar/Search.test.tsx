import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import { Sidebar } from './index';

describe('Sidebar.Search', () => {
  test('검색 영역을 s_search 치환자로 렌더링한다', () => {
    const html = renderToStaticMarkup(
      <Sidebar.Search>
        <Sidebar.SearchInput onChange={() => undefined} />
      </Sidebar.Search>,
    );

    expect(html).toContain('<s_search');
    expect(html).not.toContain('<s_rctrp_rep');
  });
});
