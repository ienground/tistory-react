import type { ReactNode } from 'react';

import { removeAllTistoryTags } from './utils';

export const TISTORY_PORTAL_HOST_ATTRIBUTE = 'data-tistory-react-portal-host';

export interface ReactRootLike {
  render(children: ReactNode): void;
}

export interface ReactDomClientLike {
  createRoot(container: Element | DocumentFragment): ReactRootLike;
  hydrateRoot?(
    container: Element | Document,
    initialChildren: ReactNode,
  ): ReactRootLike;
}

interface MountReactRootOptions {
  container: HTMLElement;
  app: ReactNode;
  hydrate?: boolean;
  prepareTistoryTags?: boolean;
  reactDomClient?: ReactDomClientLike;
}

const mountedRoots = new WeakMap<HTMLElement, ReactRootLike>();

const loadReactDomClient = (): ReactDomClientLike => {
  return require('react-dom/client') as ReactDomClientLike;
};

export const ensureTistoryPortalHost = (
  container: HTMLElement,
): HTMLElement => {
  const ownerDocument = container.ownerDocument ?? document;
  const existingHost = Array.from(
    ownerDocument.querySelectorAll<HTMLElement>(
      `[${TISTORY_PORTAL_HOST_ATTRIBUTE}]`,
    ),
  ).find(host => host !== container && !container.contains(host));

  if (existingHost) return existingHost;

  const portalHost = ownerDocument.createElement('div');
  portalHost.setAttribute(TISTORY_PORTAL_HOST_ATTRIBUTE, '');
  portalHost.id = 'tistory-react-portal-root';

  const parent = container.parentNode ?? ownerDocument.body;
  if (parent) {
    parent.insertBefore(portalHost, container.nextSibling);
  }

  return portalHost;
};

export const mountReactRoot = ({
  container,
  app,
  hydrate = false,
  prepareTistoryTags = false,
  reactDomClient = loadReactDomClient(),
}: MountReactRootOptions): ReactRootLike => {
  const mountedRoot = mountedRoots.get(container);
  if (mountedRoot) return mountedRoot;

  if (prepareTistoryTags) {
    removeAllTistoryTags(container);
  }

  let root: ReactRootLike;
  if (hydrate) {
    if (!reactDomClient.hydrateRoot) {
      throw new Error(
        '현재 React DOM client는 hydrateRoot를 지원하지 않습니다.',
      );
    }
    root = reactDomClient.hydrateRoot(container, app);
  } else {
    root = reactDomClient.createRoot(container);
  }

  mountedRoots.set(container, root);
  return root;
};
