import type { RepWrapperProps } from '#component/types';

export const Page = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_page_rep data-is-tistory-tag>{children}</s_page_rep>;
  }
  return (
    <s_page_rep data-is-tistory-tag>
      <div {...props} />
    </s_page_rep>
  );
};
