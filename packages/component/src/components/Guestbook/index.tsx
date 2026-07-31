import type { PropsWithChildren, RepWrapperProps } from '#component/types';

export const Guestbook = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_guest data-is-tistory-tag>{children}</s_guest>;
  }
  return (
    <s_guest data-is-tistory-tag>
      <div {...props} />
    </s_guest>
  );
};

const Container = ({ children }: PropsWithChildren) => (
  <s_guest_container data-is-tistory-tag>{children}</s_guest_container>
);

const Rep = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_guest_rep data-is-tistory-tag>{children}</s_guest_rep>;
  }
  return (
    <s_guest_rep data-is-tistory-tag>
      <div {...props} />
    </s_guest_rep>
  );
};

const ReplyContainer = ({ children }: PropsWithChildren) => (
  <s_guest_reply_container data-is-tistory-tag>{children}</s_guest_reply_container>
);

const ReplyRep = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_guest_reply_rep data-is-tistory-tag>{children}</s_guest_reply_rep>;
  }
  return (
    <s_guest_reply_rep data-is-tistory-tag>
      <div {...props} />
    </s_guest_reply_rep>
  );
};

const InputForm = (props: RepWrapperProps) => {
  const { children, ...rest } = props;
  if (Object.keys(rest).length === 0) {
    return <s_guest_input_form data-is-tistory-tag>{children}</s_guest_input_form>;
  }
  return (
    <s_guest_input_form data-is-tistory-tag>
      <div {...props} />
    </s_guest_input_form>
  );
};

const Member = ({ children }: PropsWithChildren) => (
  <s_guest_member data-is-tistory-tag>{children}</s_guest_member>
);

const Form = ({ children }: PropsWithChildren) => (
  <s_guest_form data-is-tistory-tag>{children}</s_guest_form>
);

export const GUEST_REP_ID = '[##_guest_rep_id_##]';
export const GUEST_REP_CLASS = '[##_guest_rep_class_##]';
export const GUEST_REP_NAME = '[##_guest_rep_name_##]';
export const GUEST_REP_DATE = '[##_guest_rep_date_##]';
export const GUEST_REP_DESC = '[##_guest_rep_desc_##]';
export const GUEST_REP_ONCLICK_DELETE = '[##_guest_rep_onclick_delete_##]';
export const GUEST_REP_ONCLICK_REPLY = '[##_guest_rep_onclick_reply_##]';
export const GUEST_INPUT_NAME = '[##_guest_input_name_##]';
export const GUEST_INPUT_PASSWORD = '[##_guest_input_password_##]';
export const GUEST_INPUT_HOMEPAGE = '[##_guest_input_homepage_##]';
export const GUEST_INPUT_COMMENT = '[##_guest_input_comment_##]';
export const GUEST_INPUT_IS_SECRET = '[##_guest_input_is_secret_##]';
export const GUEST_ONCLICK_SUBMIT = '[##_guest_onclick_submit_##]';

Guestbook.Container = Container;
Guestbook.Rep = Rep;
Guestbook.ReplyContainer = ReplyContainer;
Guestbook.ReplyRep = ReplyRep;
Guestbook.InputForm = InputForm;
Guestbook.Member = Member;
Guestbook.Form = Form;
