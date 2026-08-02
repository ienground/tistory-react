declare module '*.css';
declare module '*.svg' {
  const src: string;
  export default src;
}

declare namespace React.JSX {
  interface IntrinsicElements {
    s_list: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    s_paging: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    s_paging_rep: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    s_article_protected: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    s_article_related_rep: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
