import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
  RepWrapperProps,
} from '#component/types';

export const List = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_list data-is-tistory-tag>{children}</s_list>;
  }
  return (
    <s_list data-is-tistory-tag>
      <section {...props} />
    </s_list>
  );
};

const Image = ({ children }: PropsWithChildren) => (
  <s_list_image data-is-tistory-tag>{children}</s_list_image>
);

const ImageImg = (props: RepImgProps) => (
  <img src={LIST_IMAGE_URL} alt="" {...props} />
);

const Rep = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_list_rep data-is-tistory-tag>{children}</s_list_rep>;
  }
  return (
    <s_list_rep data-is-tistory-tag>
      <div {...props} />
    </s_list_rep>
  );
};

const Thumbnail = ({ children }: PropsWithChildren) => (
  <s_list_rep_thumbnail data-is-tistory-tag>
    {children}
  </s_list_rep_thumbnail>
);

const ThumbnailImg = (props: RepImgProps) => (
  <img src={LIST_ITEM_THUMBNAIL} alt="" {...props} />
);

const Link = (props: RepAnchorProps) => (
  <a href={LIST_ITEM_LINK} {...props} />
);

const CategoryLink = (props: RepAnchorProps) => (
  <a href={LIST_CATEGORY_LINK} {...props} />
);

export const LIST_STYLE = '[##_list_style_##]';
export const LIST_IMAGE_URL = '[##_list_image_##]';
export const LIST_TITLE = '[##_list_conform_##]';
export const LIST_DESCRIPTION = '[##_list_description_##]';
export const LIST_ITEM_LINK = '[##_list_rep_link_##]';
export const LIST_ITEM_TITLE = '[##_list_rep_title_##]';
export const LIST_ITEM_DATE = '[##_list_rep_regdate_##]';
export const LIST_CATEGORY = '[##_list_rep_category_##]';
export const LIST_CATEGORY_LINK = '[##_list_rep_category_link_##]';
export const LIST_ITEM_SUMMARY = '[##_list_rep_summary_##]';
export const LIST_ITEM_THUMBNAIL = '[##_list_rep_thumbnail_##]';

List.Image = Image;
List.ImageImg = ImageImg;
List.Rep = Rep;
List.Thumbnail = Thumbnail;
List.ThumbnailImg = ThumbnailImg;
List.Link = Link;
List.CategoryLink = CategoryLink;
