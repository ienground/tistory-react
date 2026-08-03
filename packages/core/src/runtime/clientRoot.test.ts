import { describe, expect, test } from 'vitest';

import { ensureTistoryPortalHost, mountReactRoot } from './clientRoot';

describe('mountReactRoot', () => {
  test('전용 portal host를 React root의 형제 노드로 만든다', () => {
    const insertedNodes: unknown[] = [];
    const portalHost = {
      setAttribute: (name: string, value: string) => {
        (portalHost as unknown as Record<string, string>)[name] = value;
      },
      id: '',
    };
    const ownerDocument = {
      querySelectorAll: () => [],
      createElement: () => portalHost,
      body: { appendChild: () => undefined },
    };
    const container = {
      ownerDocument,
      parentNode: {
        insertBefore: (node: unknown) => insertedNodes.push(node),
      },
      nextSibling: null,
      contains: () => false,
    };

    const result = ensureTistoryPortalHost(container as unknown as HTMLElement);

    expect(result).toBe(portalHost);
    expect(portalHost.id).toBe('tistory-react-portal-root');
    expect(insertedNodes).toEqual([portalHost]);
  });

  test('Tistory wrapper 제거 후 상태 변경과 라우트 전환 render에는 개입하지 않는다', () => {
    const calls: string[] = [];
    const tistoryElement = {
      childNodes: [],
      replaceWith: () => calls.push('replace'),
    };
    const container = {
      querySelectorAll: () => [tistoryElement],
    };
    const root = {
      render: (app: unknown) => calls.push(`render:${String(app)}`),
    };

    const mountedRoot = mountReactRoot({
      container: container as unknown as HTMLElement,
      app: null,
      prepareTistoryTags: true,
      reactDomClient: {
        createRoot: () => {
          calls.push('createRoot');
          return root;
        },
      },
    });
    mountedRoot.render('main');
    mountedRoot.render('article');
    mountReactRoot({
      container: container as unknown as HTMLElement,
      app: null,
      prepareTistoryTags: true,
      reactDomClient: {
        createRoot: () => {
          calls.push('createRoot-again');
          return root;
        },
      },
    });

    expect(calls).toEqual([
      'replace',
      'createRoot',
      'render:main',
      'render:article',
    ]);
  });

  test('hydrateRoot 경로는 React root 생성 이후 DOM 정리를 수행하지 않는다', () => {
    const calls: string[] = [];
    const tistoryElement = {
      childNodes: [],
      replaceWith: () => calls.push('replace'),
    };
    const container = {
      querySelectorAll: () => [tistoryElement],
    };

    mountReactRoot({
      container: container as unknown as HTMLElement,
      app: null,
      hydrate: true,
      reactDomClient: {
        createRoot: () => ({ render: () => calls.push('createRoot') }),
        hydrateRoot: () => {
          calls.push('hydrateRoot');
          return { render: () => calls.push('render') };
        },
      },
    });

    expect(calls).toEqual(['hydrateRoot']);
  });
});
