import type { RepWrapperProps } from '#component/types';

export const T3 = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_t3 data-is-tistory-tag>{children}</s_t3>;
  }
  return (
    <s_t3 data-is-tistory-tag>
      <div {...props} />
    </s_t3>
  );
};
