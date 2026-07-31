import type { PropsWithChildren, RepWrapperProps } from '#component/types';

export const Notice = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_notice_rep data-is-tistory-tag>{children}</s_notice_rep>;
  }
  return (
    <s_notice_rep data-is-tistory-tag>
      <div {...props} />
    </s_notice_rep>
  );
};

const Index = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_index_article_rep data-is-tistory-tag>{children}</s_index_article_rep>;
  }
  return (
    <s_index_article_rep data-is-tistory-tag>
      <div {...props} />
    </s_index_article_rep>
  );
};

const Permalink = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_permalink_article_rep data-is-tistory-tag>{children}</s_permalink_article_rep>;
  }
  return (
    <s_permalink_article_rep data-is-tistory-tag>
      <div {...props} />
    </s_permalink_article_rep>
  );
};

const Thumbnail = ({ children }: PropsWithChildren) => (
  <s_notice_rep_thumbnail data-is-tistory-tag>{children}</s_notice_rep_thumbnail>
);

export const NOTICE_LINK = '[##_notice_rep_link_##]';
export const NOTICE_TITLE = '[##_notice_rep_title_##]';
export const NOTICE_SUMMARY = '[##_notice_rep_summary_##]';
export const NOTICE_DATE = '[##_notice_rep_date_##]';
export const NOTICE_DESCRIPTION = '[##_notice_rep_desc_##]';
export const NOTICE_THUMBNAIL_URL = '[##_notice_rep_thumbnail_url_##]';

Notice.Index = Index;
Notice.Permalink = Permalink;
Notice.Thumbnail = Thumbnail;
