import type {
  PropsWithChildren,
  RepAnchorProps,
  RepUlProps,
} from '#component/types';

const TISTORY_ATTRIBUTE = 'data-tistory-attribute';

export const Paging = (props: RepUlProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_paging data-is-tistory-tag>{children}</s_paging>;
  }
  return (
    <s_paging data-is-tistory-tag>
      <ul {...props} />
    </s_paging>
  );
};

const Prev = (props: RepAnchorProps) => (
  <a
    {...{ [TISTORY_ATTRIBUTE]: PAGING_PREV_ATTRIBUTE }}
    {...props}
  />
);

const Rep = ({ children }: PropsWithChildren) => (
  <s_paging_rep data-is-tistory-tag>{children}</s_paging_rep>
);

const Link = ({ children, ...props }: RepAnchorProps) => (
  <a
    {...{ [TISTORY_ATTRIBUTE]: PAGING_ITEM_LINK_ATTRIBUTE }}
    {...props}
  >
    {children ?? PAGING_ITEM_NUMBER}
  </a>
);

const Next = (props: RepAnchorProps) => (
  <a
    {...{ [TISTORY_ATTRIBUTE]: PAGING_NEXT_ATTRIBUTE }}
    {...props}
  />
);

export const PAGING_PREV_ATTRIBUTE = '[##_prev_page_##]';
export const PAGING_NEXT_ATTRIBUTE = '[##_next_page_##]';
export const PAGING_ITEM_LINK_ATTRIBUTE = '[##_paging_rep_link_##]';
export const PAGING_ITEM_NUMBER = '[##_paging_rep_link_num_##]';
export const PAGING_NO_MORE_PREV = '[##_no_more_prev_##]';
export const PAGING_NO_MORE_NEXT = '[##_no_more_next_##]';

Paging.Prev = Prev;
Paging.Rep = Rep;
Paging.Link = Link;
Paging.Next = Next;
