import type { RepWrapperProps } from '#component/types';

export const LocalLog = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_local data-is-tistory-tag>{children}</s_local>;
  }
  return (
    <s_local data-is-tistory-tag>
      <div {...props} />
    </s_local>
  );
};

const SpotRep = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_local_spot_rep data-is-tistory-tag>{children}</s_local_spot_rep>;
  }
  return (
    <s_local_spot_rep data-is-tistory-tag>
      <div {...props} />
    </s_local_spot_rep>
  );
};

const InfoRep = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_local_info_rep data-is-tistory-tag>{children}</s_local_info_rep>;
  }
  return (
    <s_local_info_rep data-is-tistory-tag>
      <div {...props} />
    </s_local_info_rep>
  );
};

export const LOCAL_SPOT_DEPTH = '[##_local_spot_depth_##]';
export const LOCAL_SPOT = '[##_local_spot_##]';
export const LOCAL_INFO_DEPTH = '[##_local_info_depth_##]';
export const LOCAL_INFO_LINK = '[##_local_info_link_##]';
export const LOCAL_INFO_TITLE = '[##_local_info_title_##]';

LocalLog.SpotRep = SpotRep;
LocalLog.InfoRep = InfoRep;
