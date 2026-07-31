import type { PropsWithChildren, RepWrapperProps } from '#component/types';

export const CoverGroup = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_cover_group data-is-tistory-tag>{children}</s_cover_group>
  }
  return (
    <s_cover_group data-is-tistory-tag>
      <div {...props} />
    </s_cover_group>
  );
};

const CoverRep = ({ children }: PropsWithChildren) => (
  <s_cover_rep data-is-tistory-tag>{children}</s_cover_rep>
);

const Cover = (props: { name?: string } & RepWrapperProps) => {
  const { children, name, ...rest } = props;
  return (
    <s_cover data-is-tistory-tag name={name}>
      {Object.keys(rest).length === 0 ? children : <div {...rest}>{children}</div>}
    </s_cover>
  );
};

const CoverItem = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_cover_item data-is-tistory-tag>{children}</s_cover_item>;
  }
  return (
    <s_cover_item data-is-tistory-tag>
      <div {...props} />
    </s_cover_item>
  );
};

const CoverItemThumbnail = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_cover_item_thumbnail data-is-tistory-tag>{children}</s_cover_item_thumbnail>
  }
  return (
    <s_cover_item_thumbnail data-is-tistory-tag>
      <div {...props} />
    </s_cover_item_thumbnail>
  );
};

const CoverItemArticleInfo = ({ children }: PropsWithChildren) => (
  <s_cover_item_article_info data-is-tistory-tag>{children}</s_cover_item_article_info>
);

export const COVER_TITLE = '[##_cover_title_##]';
export const COVER_ITEM_TITLE = '[##_cover_item_title_##]';
export const COVER_ITEM_SUMMARY = '[##_cover_item_summary_##]';
export const COVER_ITEM_URL = '[##_cover_item_url_##]';
export const COVER_ITEM_THUMBNAIL = '[##_cover_item_thumbnail_##]';
export const COVER_ITEM_DATE = '[##_cover_item_date_##]';

CoverGroup.Rep = CoverRep;
CoverGroup.Cover = Cover;
CoverGroup.Item = CoverItem;
CoverGroup.ItemThumbnail = CoverItemThumbnail;
CoverGroup.ItemArticleInfo = CoverItemArticleInfo;
