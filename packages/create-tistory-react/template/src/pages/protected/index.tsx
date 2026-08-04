import {
  Protected,
  PROTECTED_DISSOLVE,
  PROTECTED_PASSWORD,
} from '@ienlab/tistory-react/component/Protected';
import {
  ARTICLE_CATEGORY,
  ARTICLE_DATE,
  ARTICLE_TITLE,
} from '@ienlab/tistory-react/component/Article';

export default function ProtectedPage() {
  return (
    <Protected>
      <div className="area_view page_protected_view">
        <div className="area_article">
          <div className="article_header">
            <h1 className="title_post">{ARTICLE_TITLE}</h1>
            <p className="info">
              <span className="date">{ARTICLE_DATE}</span> <span>·</span> <span>{ARTICLE_CATEGORY}</span>
            </p>
          </div>
          <div className="article_view">
            <form className="protected_form" data-onsubmit="[##_article_dissolve_##]">
              <p>보호되어 있는 글입니다. 내용을 보시려면 비밀번호를 입력하세요.</p>
              <input
                type="password"
                id={PROTECTED_PASSWORD}
                name={PROTECTED_PASSWORD}
                placeholder="비밀번호"
              />
              <button type="submit">확인</button>
            </form>
          </div>
        </div>
      </div>
    </Protected>
  );
}
