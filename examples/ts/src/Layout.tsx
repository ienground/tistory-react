import type { PropsWithChildren } from 'react';
import {
  RECENT_COMMENTER_NAME,
  RECENT_COMMENT_TIME,
  RECENT_POPULAR_ARTICLE_DATE,
  SIDEBAR_ARCHIVE_DATE,
  SIDEBAR_ARCHIVE_LINK,
  SIDEBAR_LINK_SITE,
  SIDEBAR_LINK_URL,
  SIDEBAR_LIST_CATEGORY,
  Sidebar,
  USER_COUNT_TODAY,
  USER_COUNT_TOTAL,
  USER_COUNT_YESTERDAY,
} from '@ienlab/tistory-react/component/Sidebar';
import { T3 } from '@ienlab/tistory-react/component/T3';
import './index.css';

export type LayoutComponentProps = PropsWithChildren;

export default function Layout({ children }: LayoutComponentProps) {
  return (
    <T3>
      <div id="[##_body_id_##]" data-color-set="[##_var_colorSet_##]" data-owner="[##_owner_url_##]" className="thema_apply skin_minimal">
        <header className="area_header">
          <div className="inner_header">
            <div className="header_brand">
              <h1 className="logo">
                <a href="[##_blog_link_##]">
                  <s_if_var_logoImage>
                    <img src="[##_var_logoImage_##]" alt="[##_title_##]" />
                  </s_if_var_logoImage>
                  <s_not_var_logoImage>
                    [##_title_##]
                  </s_not_var_logoImage>
                </a>
              </h1>
              <p className="title_sub">[##_desc_##]</p>
            </div>
            <nav className="site-menu">[##_blog_menu_##]</nav>
          </div>
        </header>

        <div className="container_main">
          <div className="inner_container_main">
            <div className="site-grid">
              <main id="main" className="site-main">{children}</main>

              <aside className="site-sidebar">
                <Sidebar>
                  <Sidebar.El>
                    <h2 className="sidebar_title">검색</h2>
                    <Sidebar.Search className="search-form">
                      <Sidebar.SearchInput aria-label="검색어" placeholder="검색어를 입력하세요" />
                      <Sidebar.SearchInputSubmit value="검색" />
                    </Sidebar.Search>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">카테고리</h2>
                    <div className="category_list" dangerouslySetInnerHTML={{ __html: SIDEBAR_LIST_CATEGORY }} />
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">공지사항</h2>
                    <Sidebar.NoticeWrapper>
                      <Sidebar.Notice><Sidebar.NoticeLink /></Sidebar.Notice>
                    </Sidebar.NoticeWrapper>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">최근 글</h2>
                    <ul className="sidebar_list">
                      <Sidebar.RecentArticle>
                        <Sidebar.RecentArticleThumbnail>
                          <Sidebar.RecentArticleThumbnailImg />
                        </Sidebar.RecentArticleThumbnail>
                        <div className="sidebar_item_info">
                          <Sidebar.RecentArticleTitleLink />
                          <time>{RECENT_POPULAR_ARTICLE_DATE}</time>
                        </div>
                      </Sidebar.RecentArticle>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">인기 글</h2>
                    <ul className="sidebar_list">
                      <Sidebar.PopularArticle>
                        <div className="sidebar_item_info">
                          <Sidebar.PopularArticleTitleLink />
                          <time>{RECENT_POPULAR_ARTICLE_DATE}</time>
                        </div>
                      </Sidebar.PopularArticle>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">최근 댓글</h2>
                    <ul className="sidebar_list">
                      <Sidebar.RecentComment>
                        <div className="sidebar_item_info">
                          <Sidebar.RecentCommentLink />
                          <small>{RECENT_COMMENTER_NAME} · {RECENT_COMMENT_TIME}</small>
                        </div>
                      </Sidebar.RecentComment>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">태그</h2>
                    <ul className="sidebar_tags">
                      <Sidebar.RandomTags><Sidebar.RandomTagsLink /></Sidebar.RandomTags>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">링크</h2>
                    <ul className="sidebar_list">
                      <Sidebar.LinkRep>
                        <li><a href={SIDEBAR_LINK_URL}>{SIDEBAR_LINK_SITE}</a></li>
                      </Sidebar.LinkRep>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">아카이브</h2>
                    <ul className="sidebar_list">
                      <Sidebar.ArchiveRep>
                        <li><a href={SIDEBAR_ARCHIVE_LINK}>{SIDEBAR_ARCHIVE_DATE}</a></li>
                      </Sidebar.ArchiveRep>
                    </ul>
                  </Sidebar.El>

                  <Sidebar.El>
                    <h2 className="sidebar_title">방문자</h2>
                    <dl className="visitor-count">
                      <div><dt>전체</dt><dd>{USER_COUNT_TOTAL}</dd></div>
                      <div><dt>오늘</dt><dd>{USER_COUNT_TODAY}</dd></div>
                      <div><dt>어제</dt><dd>{USER_COUNT_YESTERDAY}</dd></div>
                    </dl>
                  </Sidebar.El>
                </Sidebar>
              </aside>
            </div>
          </div>
        </div>

        <footer className="area_footer">
          <div className="inner_footer">
            <div className="footer_links">
              <s_if_var_footerLink1Name>
                <a href="[##_var_footerLink1Url_##]">[##_var_footerLink1Name_##]</a>
              </s_if_var_footerLink1Name>
              <s_if_var_footerLink2Name>
                <a href="[##_var_footerLink2Url_##]">[##_var_footerLink2Name_##]</a>
              </s_if_var_footerLink2Name>
              <s_if_var_footerLink3Name>
                <a href="[##_var_footerLink3Url_##]">[##_var_footerLink3Name_##]</a>
              </s_if_var_footerLink3Name>
              <s_if_var_footerLink4Name>
                <a href="[##_var_footerLink4Url_##]">[##_var_footerLink4Name_##]</a>
              </s_if_var_footerLink4Name>
            </div>
            <p className="copyright">[##_var_footerCopyright_##]</p>
          </div>
        </footer>
      </div>
    </T3>
  );
}
