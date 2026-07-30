import path from 'node:path';
import fs from '@ienlab/tistory-react-shared/fs-extra';
import { logger } from '@ienlab/tistory-react-shared/logger';
import enhancedResolve from 'enhanced-resolve';
import { PACKAGE_ROOT } from '../constants';

const { CachedInputFileSystem, ResolverFactory } = enhancedResolve;

const DEFAULT_REACT_VERSION = 18;

export async function detectReactVersion(
  projectRoot = process.cwd(),
): Promise<number> {
  // Detect react version from current cwd
  // return the major version of react
  // if not found, return 18
  const reactPath = path.join(projectRoot, 'node_modules', 'react');
  if (await fs.pathExists(reactPath)) {
    const reactPkg = await fs.readJson(path.join(reactPath, 'package.json'));
    const version = Number(reactPkg.version.split('.')[0]);
    return version;
  }

  return DEFAULT_REACT_VERSION;
}

export async function resolveReactAlias(
  reactVersion: number,
  isSSR: boolean,
  projectRoot = process.cwd(),
) {
  const basedir = (await fs.pathExists(
    path.join(projectRoot, 'node_modules', 'react'),
  ))
    ? projectRoot
    : PACKAGE_ROOT;
  const libPaths = [
    'react',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'react-dom',
    'react-dom/server',
  ];
  if (reactVersion >= 18) {
    libPaths.push('react-dom/client');
  }
  const alias: Record<string, string> = {};
  const resolver = ResolverFactory.createResolver({
    fileSystem: new CachedInputFileSystem(fs as any, 0),
    extensions: ['.js'],
    alias,
    conditionNames: isSSR ? ['...'] : ['browser', '...'],
  });
  await Promise.all(
    libPaths.map(async lib => {
      try {
        alias[lib] = await new Promise<string>((resolve, reject) => {
          resolver.resolve(
            { importer: basedir },
            basedir,
            lib,
            {},
            (err, filePath) => {
              if (err || filePath === false) {
                return reject(err);
              }
              return resolve(filePath);
            },
          );
        });
      } catch (e) {
        console.log(e);
        logger.warn(`${lib} not found`);
      }
    }),
  );
  return alias;
}
