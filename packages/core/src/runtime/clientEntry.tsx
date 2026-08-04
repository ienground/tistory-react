import { DevTools } from '@ienlab/tistory-react-devtool';
import { BrowserRouter } from '@ienlab/tistory-react-runtime';
import { isProduction } from '@ienlab/tistory-react-shared';
import { createPortal } from 'react-dom';
import { App } from './App';
import {
  type ReactDomClientLike,
  ensureTistoryPortalHost,
  mountReactRoot,
} from './clientRoot';

import '@ienlab/tistory-react-devtool/css';

export interface RenderInBrowserOptions {
  hydrate?: boolean;
  prepareTistoryTags?: boolean;
}

export async function renderInBrowser({
  hydrate = false,
  prepareTistoryTags = !hydrate,
}: RenderInBrowserOptions = {}) {
  const container = document.getElementById('root');
  if (!container) return;

  const portalHost = ensureTistoryPortalHost(container);

  const RootApp = () => {
    return (
      <BrowserRouter basename={process.env.__BASE__ || undefined}>
        <App />
        {createPortal(<DevTools />, portalHost)}
      </BrowserRouter>
    );
  };

  if (process.env.__IS_REACT_18__) {
    const reactDomClient = require('react-dom/client') as ReactDomClientLike;
    const root = mountReactRoot({
      container,
      app: <RootApp />,
      hydrate,
      prepareTistoryTags,
      reactDomClient,
    });
    if (!hydrate) root.render(<RootApp />);
  } else {
    const ReactDOM = require('react-dom');
    if (isProduction()) {
      ReactDOM.hydrate(<RootApp />, container);
    } else {
      ReactDOM.render(<RootApp />, container);
    }
  }
}

if (typeof document !== 'undefined') {
  renderInBrowser();
}
