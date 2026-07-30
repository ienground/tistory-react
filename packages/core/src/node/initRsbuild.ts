import path from 'node:path';
import {
  TISTORY_REACT_TEMP_DIR,
  type UserConfig,
  removeLeadingSlash,
  removeTrailingSlash,
} from '@ienlab/tistory-react-shared';
import fs from '@ienlab/tistory-react-shared/fs-extra';
import type {
  RsbuildConfig,
  RsbuildInstance,
  RsbuildPlugin,
} from '@rsbuild/core';
import { PLUGIN_REACT_NAME, pluginReact } from '@rsbuild/plugin-react';
import {
  BUNDLE_DIR,
  CLIENT_ENTRY,
  DEFAULT_TITLE,
  OUTPUT_DIR,
  PACKAGE_ROOT,
  PUBLIC_DIR,
  SSR_ENTRY,
  TISTORY_DEFAULT_CSS_NAME,
  isProduction,
} from './constants';
import type { RouteService } from './route/RouteService';
import { initRouteService } from './route/init';
import { rsbuildPluginDocVM } from './runtimeModule';
import { detectReactVersion, resolveReactAlias } from './utils';

export interface MdxRsLoaderCallbackContext {
  resourcePath: string;
  links: string[];
  root: string;
  base: string;
}

function isPluginIncluded(config: UserConfig, pluginName: string): boolean {
  return (
    config.builderPlugins?.some(plugin => plugin.name === pluginName) ||
    config.builderConfig?.plugins?.some(
      plugin => plugin && (plugin as RsbuildPlugin).name === pluginName,
    )
  );
}

async function createInternalBuildConfig(
  userDocRoot: string,
  config: UserConfig,
  enableSSG: boolean,
  routeService: RouteService,
  // pluginDriver: PluginDriver,
  runtimeTempDir: string,
): Promise<RsbuildConfig> {
  const cwd = process.cwd();
  const base = config?.base ?? '';
  const baseOutDir = config?.outDir ?? OUTPUT_DIR;
  const csrOutDir = baseOutDir;
  const ssrOutDir = path.join(baseOutDir, 'ssr');

  // const DEFAULT_THEME = require.resolve("@rspress/theme-default");

  // In production, we need to add assetPrefix in asset path
  const assetPrefix = isProduction()
    ? removeTrailingSlash(config?.builderConfig?.output?.assetPrefix ?? '.')
    : '.';
  const reactVersion = await detectReactVersion(userDocRoot);

  const normalizeIcon = (icon: string | undefined) => {
    if (!icon) {
      return undefined;
    }

    if (path.isAbsolute(icon)) {
      return path.join(userDocRoot, PUBLIC_DIR, icon);
    }

    return icon;
  };

  // Using latest browserslist in development to improve build performance
  const webBrowserslist = isProduction()
    ? ['chrome >= 111', 'edge >= 111', 'firefox >= 128', 'safari >= 16.4']
    : [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
      ];
  const ssrBrowserslist = ['node >= 20.19'];

  const [reactCSRAlias, reactSSRAlias] = await Promise.all([
    resolveReactAlias(reactVersion, false, userDocRoot),
    enableSSG
      ? resolveReactAlias(reactVersion, true, userDocRoot)
      : Promise.resolve({}),
  ]);

  return {
    plugins: [
      ...(isPluginIncluded(config, PLUGIN_REACT_NAME) ? [] : [pluginReact()]),
      rsbuildPluginDocVM({
        userDocRoot,
        config,
        runtimeTempDir,
        routeService,
      }),
    ],
    server: {
      port:
        !isProduction() && process.env.PORT
          ? Number(process.env.PORT)
          : undefined,
      printUrls: ({ urls }) => {
        const baseUrl = config?.base ?? '';
        return urls.map(url => `${url}/${removeLeadingSlash(baseUrl)}`);
      },
      publicDir: {
        name: path.join(userDocRoot, PUBLIC_DIR),
      },
    },
    dev: {
      progressBar: false,
      // Serve static files
    },
    html: {
      title: DEFAULT_TITLE,
      favicon: normalizeIcon(config?.icon),
      template: path.join(PACKAGE_ROOT, 'index.html'),
      // tags:
    },
    output: {
      assetPrefix,
      distPath: {
        // just for rsbuild preview
        root: csrOutDir,
        js: BUNDLE_DIR,
        jsAsync: BUNDLE_DIR,
      },
      legalComments: 'none',
    },
    source: {
      alias: {
        '@ienlab/tistory-react-core': PACKAGE_ROOT,
      },
      include: [
        PACKAGE_ROOT,
        path.join(cwd, 'node_modules', TISTORY_REACT_TEMP_DIR),
      ],
      define: {
        'process.env.__ASSET_PREFIX__': JSON.stringify(assetPrefix),
        'process.env.__IS_REACT_18__': JSON.stringify(reactVersion >= 18),
        'process.env.TEST': JSON.stringify(process.env.TEST),
      },
    },
    // performance: {
    //   chunkSplit: {
    //     override: {
    //       cacheGroups: {
    //         // extract all CSS into a single file
    //         // ensure CSS in async chunks can be loaded for SSG
    //         styles: {
    //           filename: 'style.css',
    //           minSize: 0,
    //           chunks: 'all',
    //           test: /\.(?:css|less|sass|scss)$/,
    //           priority: 99,
    //         },
    //       },
    //     },
    //   },
    // },
    tools: {
      bundlerChain(chain, { target }) {
        const isServer = target === 'node';

        if (isServer) {
          chain.output.filename('main.cjs');
        }
      },
    },
    environments: {
      web: {
        resolve: {
          alias: reactCSRAlias,
        },
        source: {
          entry: {
            index: CLIENT_ENTRY,
          },
          define: {
            'process.env.__SSR__': JSON.stringify(false),
            'process.env.__IS_REACT_18__': JSON.stringify(reactVersion >= 18),
            'process.env.__ASSET_PREFIX__': JSON.stringify(assetPrefix),
            'process.env.__ENABLE_VARIABLE_SWAP___': JSON.stringify(
              config.dev?.enableVariableSwap ?? true,
            ),
          },
        },
        output: {
          target: 'web',
          overrideBrowserslist: webBrowserslist,
          distPath: {
            root: csrOutDir,
            css: '.',
          },
          filename: {
            css: TISTORY_DEFAULT_CSS_NAME,
          },
        },
      },
      ...(enableSSG
        ? {
            node: {
              resolve: {
                alias: reactSSRAlias,
              },
              source: {
                entry: {
                  index: SSR_ENTRY,
                },
                define: {
                  'process.env.__SSR__': JSON.stringify(true),
                  'process.env.__IS_REACT_18__': JSON.stringify(
                    reactVersion >= 18,
                  ),
                  'process.env.__ASSET_PREFIX__': JSON.stringify(assetPrefix),
                },
              },
              performance: {
                printFileSize: false,
              },
              output: {
                target: 'node',
                module: false,
                overrideBrowserslist: ssrBrowserslist,
                distPath: {
                  root: ssrOutDir,
                },
                minify: false,
              },
            },
          }
        : {}),
    },
  };
}

export async function initRsbuild(
  rootDir: string,
  config: UserConfig,
  enableSSG: boolean,
  extraRsbuildConfig?: RsbuildConfig,
): Promise<RsbuildInstance> {
  const cwd = process.cwd();
  const userDocRoot = path.resolve(rootDir || config?.root || cwd);
  const builderPlugins = config?.builderPlugins ?? [];
  // We use a temp dir to store runtime files, so we can separate client and server build
  // and we should empty temp dir before build
  const runtimeTempDir = path.join(TISTORY_REACT_TEMP_DIR, 'runtime');
  const runtimeAbsTempDir = path.join(cwd, 'node_modules', runtimeTempDir);
  await fs.ensureDir(runtimeAbsTempDir);

  const routeService = await initRouteService({
    config,
    scanDir: userDocRoot,
  });
  const { createRsbuild, mergeRsbuildConfig } = await import('@rsbuild/core');

  const internalRsbuildConfig = await createInternalBuildConfig(
    userDocRoot,
    config,
    enableSSG,
    routeService,
    // pluginDriver,
    runtimeTempDir,
  );

  const rsbuild = await createRsbuild({
    rsbuildConfig: mergeRsbuildConfig(
      internalRsbuildConfig,
      config?.builderConfig || {},
      extraRsbuildConfig || {},
    ),
  });

  rsbuild.addPlugins(builderPlugins);

  return rsbuild;
}
