import { Article } from '@ienlab/tistory-react-component/Article';
import { Comment } from '@ienlab/tistory-react-component/Comment';
import { Sidebar } from '@ienlab/tistory-react-component/Sidebar';
import { Tags } from '@ienlab/tistory-react-component/Tags';

import type { TistoryComponentsEnum } from 'src/types';

export function getTistoryComponent(name: TistoryComponentsEnum) {
  const tistoryComponents = {
    Article,
    Comment,
    Sidebar,
    Tags,
  };
  return tistoryComponents[name];
}
