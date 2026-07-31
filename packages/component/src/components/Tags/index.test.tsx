import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import { Tags } from './index';

describe('Tags.Anchor', () => {
  test('className을 생략해도 undefined 문자열을 출력하지 않는다', () => {
    const html = renderToStaticMarkup(<Tags.Anchor />);

    expect(html).toContain('class="[##_tag_class_##]"');
    expect(html).not.toContain('undefined');
  });
});
