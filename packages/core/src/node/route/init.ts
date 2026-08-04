import type { UserConfig } from '@ienlab/tistory-react-shared';
import { RouteService } from './RouteService';

interface InitOptions {
  scanDir: string;
  config: UserConfig;
}

// eslint-disable-next-line import/no-mutable-exports
export let routeService: RouteService | null = null;

// The factory to create route serveice instance
export async function initRouteService(options: InitOptions) {
  const { scanDir } = options;
  routeService = new RouteService(scanDir);
  await routeService.init();
  return routeService;
}
