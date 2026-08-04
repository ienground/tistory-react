import { Tags } from '@ienlab/tistory-react/component/Tags';

export default function TagPage() {
  return (
    <Tags className="tag-page page_tags_view">
      <h1 className="title_section">태그</h1>
      <ul className="sidebar_tags">
        <Tags.Rep><li><Tags.Anchor /></li></Tags.Rep>
      </ul>
    </Tags>
  );
}
