import { renderToString } from 'react-dom/server';
import { StaticRouter } from '@ienlab/tistory-react-runtime/server';
import { App } from './App';

export async function render(): Promise<{ appHtml: string }> {
  const appHtml = renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>,
  );

  return {
    appHtml,
  };
}
