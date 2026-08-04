import {
  ADMIN_CURRENT_STATE,
  Article,
  ARTICLE_AUTHOR,
  ARTICLE_CATEGORY,
  ARTICLE_COMMENT_COUNT,
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_SUMMARY,
  ARTICLE_THUMBNAIL_URL,
  ARTICLE_TITLE,
  NEXT_DATE,
  NEXT_TITLE,
  PREV_DATE,
  PREV_TITLE,
  RELATED_ARTICLE_DATE,
  RELATED_ARTICLE_TITLE,
  RELATED_THUMBNAIL_LINK,
  TAG_LABEL,
} from '@ienlab/tistory-react/component/Article';
import { Comment, COMMENT_DESC } from '@ienlab/tistory-react/component/Comment';

export default function ArticlePage() {
  return (
    <div className="area_view page_article_view">
      <Article>
        <Article.Index>
          <div className="list_index category_type_[##_var_listType_##] category_index_list">
            <div className="item_category">
              <Article.ArticleLink className="link_category">
                <Article.Thumbnail>
                  <span
                    className="thumnail item-thumbnail"
                    style={{ backgroundImage: 'url("' + ARTICLE_THUMBNAIL_URL + '")' }}
                  />
                </Article.Thumbnail>
                <div className="info">
                  <strong className="name">{ARTICLE_TITLE}</strong>
                  <p className="text summary">{ARTICLE_SUMMARY}</p>
                  <span className="date">{ARTICLE_DATE}</span>
                </div>
              </Article.ArticleLink>
            </div>
          </div>
        </Article.Index>

        <Article.Permalink>
          <div id="page_scroll"></div>
          <div className="area_article">
            <div className="article_header">
              <h1 className="title_post">{ARTICLE_TITLE}</h1>
              <p className="info">
                <span className="date">{ARTICLE_DATE}</span>
                <span>·</span>
                <span className="category">{ARTICLE_CATEGORY}</span>
              </p>
            </div>

            <div className="article_view">{ARTICLE_DESCRIPTION}</div>

            <div className="article_content">
              <Article.Tag>
                <div className="area_tag">
                  <div className="tag_content thema_apply">{TAG_LABEL}</div>
                </div>
              </Article.Tag>

              <div className="area_reply">
                <div className="box_reply_info">
                  <Article.RedirectCommentLink className="reply_events">
                    댓글 <span>{ARTICLE_COMMENT_COUNT}</span>
                  </Article.RedirectCommentLink>
                </div>

                <div className="reply_content">
                  <Comment>
                    <Comment.ListWrapper className="box_comment_list">
                      <Comment.List className="[##_rp_rep_class_##]">
                        <header>
                          <Comment.Logo />
                          <Comment.Name />
                          <Comment.Date />
                        </header>
                        <p className="txt">{COMMENT_DESC}</p>
                        <div className="modify">
                          <Comment.WriteReplyLink />
                          <Comment.ModifyOrDeleteLink />
                        </div>
                        <Comment.ReplyWrapper>
                          <Comment.Reply className="list_reply_comment">
                            <header>
                              <Comment.Logo />
                              <Comment.Name />
                              <Comment.Date />
                            </header>
                            <p className="txt">{COMMENT_DESC}</p>
                            <Comment.ModifyOrDeleteLink />
                          </Comment.Reply>
                        </Comment.ReplyWrapper>
                      </Comment.List>
                    </Comment.ListWrapper>

                    <Comment.InputForm>
                      <form method="post">
                        <div className="reply_write">
                          <Comment.InputFormForMember>
                            <Comment.InputFormForGuest>
                              <div className="form_guest">
                                <div className="box_inp">
                                  <div className="inner_inp">
                                    <Comment.InputNameForGuest
                                      className="inp_comment inp_name"
                                      placeholder="이름"
                                    />
                                  </div>
                                </div>
                                <div className="box_inp">
                                  <div className="inner_inp">
                                    <Comment.InputPasswordForGuest
                                      className="inp_comment inp_password"
                                      placeholder="비밀번호"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Comment.InputFormForGuest>
                          </Comment.InputFormForMember>

                          <div className="form_content">
                            <Comment.InputTextArea placeholder="댓글을 입력해주세요." />
                          </div>

                          <div className="form_reg thema_apply">
                            <label>
                              <Comment.InputCheckboxForSecret /> 비공개
                            </label>
                            <Comment.InputSubmit label="댓글 남기기" className="btn_register" />
                          </div>
                        </div>
                      </form>
                    </Comment.InputForm>
                  </Comment>
                </div>
              </div>

              <Article.Related>
                <div className="area_related">
                  <h3 className="title_related title_section">관련글</h3>
                  <ul className="list_related list_category">
                    <Article.RelatedRep>
                      <li className="item_related item_category">
                        <Article.RelatedLink className="link_related link_category">
                          <Article.RelatedThumbnail>
                            <span
                              className="thumnail item-thumbnail"
                              style={{ backgroundImage: 'url("' + RELATED_THUMBNAIL_LINK + '")' }}
                            />
                          </Article.RelatedThumbnail>
                          <div className="info">
                            <strong className="name">{RELATED_ARTICLE_TITLE}</strong>
                            <span className="date">{RELATED_ARTICLE_DATE}</span>
                          </div>
                        </Article.RelatedLink>
                      </li>
                    </Article.RelatedRep>
                  </ul>
                </div>
              </Article.Related>
            </div>
          </div>
        </Article.Permalink>
      </Article>
    </div>
  );
}
