import { Tags } from '@ienlab/tistory-react/component/Tags';

export default function TagPage() {
  return (
    <Tags className="tag-page">
      <h1>태그</h1>
      <ul>
        <Tags.Rep><li><Tags.Anchor /></li></Tags.Rep>
      </ul>
    </Tags>
  );
}
