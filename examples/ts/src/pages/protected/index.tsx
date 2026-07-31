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
      <div className="area_view">
        <div className="area_article">
          <div className="article_header">
            <div className="inner_header" style={{ backgroundImage: "url('')" }}>
              <div className="info_text">
                <strong className="title_post">{ARTICLE_TITLE}</strong>
                <p className="info">
                  <span className="date">{ARTICLE_DATE}</span>ㆍ<span>{ARTICLE_CATEGORY}</span>
                </p>
              </div>
            </div>
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
