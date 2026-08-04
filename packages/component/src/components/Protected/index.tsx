import type { RepWrapperProps } from '#component/types';

export const Protected = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_article_protected data-is-tistory-tag>{children}</s_article_protected>;
  }
  return (
    <s_article_protected data-is-tistory-tag>
      <div {...props} />
    </s_article_protected>
  );
};

export const PROTECTED_DISSOLVE = '[##_article_dissolve_##]';
export const PROTECTED_PASSWORD = '[##_article_password_##]';
