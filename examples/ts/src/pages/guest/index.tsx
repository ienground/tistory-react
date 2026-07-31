import {
  Guestbook,
  GUEST_INPUT_COMMENT,
  GUEST_INPUT_HOMEPAGE,
  GUEST_INPUT_IS_SECRET,
  GUEST_INPUT_NAME,
  GUEST_INPUT_PASSWORD,
  GUEST_ONCLICK_SUBMIT,
  GUEST_REP_CLASS,
  GUEST_REP_DATE,
  GUEST_REP_DESC,
  GUEST_REP_ID,
  GUEST_REP_NAME,
  GUEST_REP_ONCLICK_DELETE,
  GUEST_REP_ONCLICK_REPLY,
} from '@ienlab/tistory-react/component/Guestbook';

export default function GuestbookPage() {
  return (
    <Guestbook>
      <div className="area_common">
        <div className="area_article">
          <div className="area_reply">
            <h2 className="title_common">방명록</h2>
            <div className="reply_content">
              <div className="box_comment_list">
                <Guestbook.Container>
                  <ul className="list_reply">
                    <Guestbook.Rep>
                      <li id="[##_guest_rep_id_##]" className="item_reply [##_guest_rep_class_##]">
                        <div className="thumbnail_reply">
                          <img
                            src="https://t1.daumcdn.net/tistory_admin/blog/admin/profile_default_07.png"
                            width="50"
                            height="50"
                            alt="프로필사진"
                          />
                        </div>
                        <div className="box_reply_content">
                          <div className="user">
                            <a className="link_name">{GUEST_REP_NAME}</a>
                            <span className="date">ㆍ {GUEST_REP_DATE}</span>
                          </div>
                          <p className="txt">{GUEST_REP_DESC}</p>
                          <div className="modify">
                            <a href="#" data-onclick="[##_guest_rep_onclick_delete_##]">수정/삭제</a>
                            <span className="slash">I</span>
                            <a href="#" data-onclick="[##_guest_rep_onclick_reply_##]">답글</a>
                          </div>
                        </div>

                        <Guestbook.ReplyContainer>
                          <ul className="list_reply_comment">
                            <Guestbook.ReplyRep>
                              <li id={GUEST_REP_ID} className="item_comment reply [##_guest_rep_class_##]">
                                <div className="ico_commnent">ㄴ</div>
                                <div className="thumbnail_reply">
                                  <img
                                    src="https://t1.daumcdn.net/tistory_admin/blog/admin/profile_default_07.png"
                                    width="50"
                                    height="50"
                                    alt="프로필사진"
                                  />
                                </div>
                                <div className="box_reply_content">
                                  <div className="user">
                                    <a className="link_name">{GUEST_REP_NAME}</a>
                                    <span className="date">ㆍ {GUEST_REP_DATE}</span>
                                  </div>
                                  <p className="txt">{GUEST_REP_DESC}</p>
                                  <div className="modify">
                                    <a href="#" onClick={GUEST_REP_ONCLICK_DELETE as any}>수정/삭제</a>
                                  </div>
                                </div>
                              </li>
                            </Guestbook.ReplyRep>
                          </ul>
                        </Guestbook.ReplyContainer>
                      </li>
                    </Guestbook.Rep>
                  </ul>
                </Guestbook.Container>
              </div>

              <Guestbook.InputForm>
                <form method="post">
                  <div className="reply_write">
                    <Guestbook.Member>
                      <Guestbook.Form>
                        <div className="form_guest">
                          <div className="box_inp">
                            <div className="inner_inp">
                              <input
                                type="text"
                                name={GUEST_INPUT_NAME}
                                placeholder="이름"
                                className="inp_comment inp_name"
                              />
                            </div>
                          </div>
                          <div className="box_inp">
                            <div className="inner_inp">
                              <input
                                type="password"
                                name={GUEST_INPUT_PASSWORD}
                                placeholder="비밀번호"
                                className="inp_comment inp_password"
                              />
                            </div>
                          </div>
                          <div className="box_inp">
                            <div className="inner_inp">
                              <input
                                type="url"
                                name={GUEST_INPUT_HOMEPAGE}
                                placeholder="홈페이지"
                                className="inp_comment inp_homepage"
                              />
                            </div>
                          </div>
                        </div>
                      </Guestbook.Form>
                    </Guestbook.Member>

                    <div className="form_content">
                      <textarea
                        id="[##_rguestinput_comment_##]"
                        name={GUEST_INPUT_COMMENT}
                        placeholder="방명록을 입력해주세요."
                      />
                    </div>

                    <div className="form_reg thema_apply">
                      <label>
                        <input type="checkbox" name={GUEST_INPUT_IS_SECRET} /> 비공개
                      </label>
                      <button
                        type="button"
                        className="btn_register"
                        data-onclick="[##_guest_onclick_submit_##]"
                      >
                        방명록 남기기
                      </button>
                    </div>
                  </div>
                </form>
              </Guestbook.InputForm>
            </div>
          </div>
        </div>
      </div>
    </Guestbook>
  );
}
