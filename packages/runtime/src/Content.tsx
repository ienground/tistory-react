import { useLocation } from 'react-router';
import { removeLeadingSlash } from '@ienlab/tistory-react-shared';
import { createElement } from 'react';

const { routes } = require('virtual-routes') as typeof import('virtual-routes');

function resolveComponent(comp: any): any {
  if (!comp) return null;
  if (typeof comp === 'function') return comp;
  if (typeof comp === 'object') {
    if (comp.$$typeof) return comp;
    if (comp.default) return resolveComponent(comp.default);
  }
  return comp;
}

export const Content = () => {
  const isSSR = process.env.__SSR__;

  const layoutRoute = routes.find(
    route => route.pageName === 'layout',
  );

  if (!layoutRoute) {
    return null;
  }

  const LayoutComponent = resolveComponent(
    layoutRoute.component || (layoutRoute.element as any)?.type,
  );

  if (!LayoutComponent) {
    return null;
  }

  if (!isSSR) {
    const { pathname } = useLocation();
    const cleanPath = removeLeadingSlash(pathname);
    let pageName = cleanPath.split('/')[0] || 'main';
    if (cleanPath.endsWith('.html') || cleanPath.startsWith('images')) {
      pageName = 'main';
    }

    const pathRoute =
      routes.find(route => route.pageName === pageName) ||
      routes.find(route => route.pageName === 'main');

    const ChildComponent = resolveComponent(
      pathRoute?.component || (pathRoute?.element as any)?.type,
    );

    const childElement = ChildComponent ? createElement(ChildComponent) : null;

    return createElement(LayoutComponent, null, childElement);
  }

  const routesElements = routes
    .filter(route => route.pageName !== 'layout')
    .map((route, index) => {
      const Comp = resolveComponent(
        route.component || (route.element as any)?.type,
      );
      return Comp
        ? createElement(Comp, { key: route.pageName || index })
        : null;
    })
    .filter(Boolean);

  return createElement(LayoutComponent, null, routesElements);
};
