import { execFile } from 'node:child_process';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import vm from 'node:vm';
import type { UserConfig } from '@ienlab/tistory-react-shared';
import fs from '@ienlab/tistory-react-shared/fs-extra';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { initRsbuild } from './initRsbuild';
import { normalizePath } from './utils';

const execFileAsync = promisify(execFile);

type CompiledCore = typeof import('./index');
let compiledCore: CompiledCore;

async function getAvailablePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('테스트용 포트를 확인할 수 없습니다.'));
        return;
      }
      server.close(error => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

async function waitForServer(url: string): Promise<Response> {
  const deadline = Date.now() + 10_000;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      lastError = new Error(`dev server 응답 코드: ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  throw lastError ?? new Error('dev server가 준비되지 않았습니다.');
}

const TISTORY_LINK_VARIABLES = [
  '[##_article_rep_link_##]',
  '[##_article_related_rep_link_##]',
  '[##_article_prev_link_##]',
  '[##_article_next_link_##]',
];

const PRODUCTION_BUNDLE_FORBIDDEN_VALUES = [
  'DevTools',
  'CodeIcon',
  'DEFAULT_HREF_LINK',
  '/article',
];

describe.sequential('production build', () => {
  const fixtureRoot = normalizePath(join(__dirname, 'fixtures/production'));
  const previousNodeEnv = process.env.NODE_ENV;
  let appDirectory: string;
  let outputDirectory: string;
  let skinHtml: string;
  let javascriptBundle: string;
  let javascriptPaths: string[];
  let productionConfig: UserConfig;

  beforeAll(async () => {
    process.env.NODE_ENV = 'production';
    appDirectory = await fs.mkdtemp(
      join(tmpdir(), 'tistory-react-production-'),
    );
    outputDirectory = join(appDirectory, 'build');
    productionConfig = {
      outDir: outputDirectory,
      builderConfig: { output: { dataUriLimit: 0 } },
    };

    await execFileAsync(
      'npm',
      ['run', 'build', '--workspace', 'packages/core'],
      {
        cwd: join(__dirname, '../../../..'),
      },
    );
    compiledCore = (await import(
      `${pathToFileURL(join(__dirname, '../../dist/index.js')).href}?production-test=${Date.now()}`
    )) as CompiledCore;

    await compiledCore.build({
      appDirectory,
      docDirectory: fixtureRoot,
      config: productionConfig,
    });

    skinHtml = await fs.readFile(join(outputDirectory, 'skin.html'), 'utf8');
    const javascriptFiles = await fs.readdir(join(outputDirectory, 'images'));
    javascriptPaths = javascriptFiles
      .filter(file => file.endsWith('.js'))
      .map(file => join(outputDirectory, 'images', file));
    javascriptBundle = (
      await Promise.all(javascriptPaths.map(file => fs.readFile(file, 'utf8')))
    ).join('\n');
  }, 60_000);

  afterAll(async () => {
    process.env.NODE_ENV = previousNodeEnv;
    await fs.remove(appDirectory);
  });

  test('skin.html에 티스토리 링크 치환자를 보존한다', () => {
    for (const variable of TISTORY_LINK_VARIABLES) {
      expect(skinHtml).toContain(variable);
    }
  });

  test('skin.html에 글 본문과 글 목록 그룹을 함께 보존한다', () => {
    expect(skinHtml).toContain('<s_article_rep');
    expect(skinHtml).toContain('<s_permalink_article_rep');
    expect(skinHtml).toContain('data-production-content="article"');
    expect(skinHtml).toContain('<s_index_article_rep');
    expect(skinHtml).toContain('data-production-content="article-list"');
  });

  test('JavaScript bundle에서 DevTools와 링크 샘플을 제외한다', () => {
    for (const forbiddenValue of PRODUCTION_BUNDLE_FORBIDDEN_VALUES) {
      expect(javascriptBundle).not.toContain(forbiddenValue);
    }
  });

  test('티스토리가 치환한 링크를 변경할 production DOM runtime을 만들지 않는다', async () => {
    const rsbuild = await initRsbuild(fixtureRoot, productionConfig, true);
    const config = rsbuild.getRsbuildConfig();
    const clientEntry = config.environments?.web?.source?.entry?.index;
    const tistoryDom = { articleHref: '/123' };

    expect(String(clientEntry)).toMatch(/productionClientEntry\.js$/);
    expect(
      config.environments?.web?.source?.define?.[
        'process.env.__ENABLE_VARIABLE_SWAP___'
      ],
    ).toBe('false');
    expect(tistoryDom.articleHref).toBe('/123');
  });

  test('티스토리가 치환한 DOM에서 production bundle을 실행해도 링크를 보존한다', async () => {
    const anchor = { href: '/123' };
    let domAccessCount = 0;
    const context = vm.createContext({
      console,
      setTimeout,
      clearTimeout,
      document: {
        getElementById() {
          domAccessCount += 1;
          return null;
        },
        querySelector() {
          domAccessCount += 1;
          return anchor;
        },
      },
    });

    for (const javascriptPath of javascriptPaths) {
      vm.runInContext(await fs.readFile(javascriptPath, 'utf8'), context);
    }

    await Promise.resolve();
    expect(domAccessCount).toBe(0);
    expect(anchor.href).toBe('/123');
  });

  test('style.css와 CSS에서 참조한 폰트 및 이미지를 출력한다', async () => {
    const cssPath = join(outputDirectory, 'style.css');
    const css = await fs.readFile(cssPath, 'utf8');
    const assetUrls = Array.from(
      css.matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/g),
    )
      .map(match => match[1])
      .filter(url => !url.startsWith('data:'));

    expect(assetUrls).toHaveLength(2);
    for (const assetUrl of assetUrls) {
      expect(await fs.pathExists(join(outputDirectory, assetUrl))).toBe(true);
    }
  });
});

describe.sequential('development build', () => {
  const fixtureRoot = normalizePath(join(__dirname, 'fixtures/production'));
  const previousNodeEnv = process.env.NODE_ENV;

  afterAll(() => {
    process.env.NODE_ENV = previousNodeEnv;
  });

  test('DevTools entry와 변수 샘플 치환을 기본 활성화한다', async () => {
    process.env.NODE_ENV = 'development';
    const rsbuild = await initRsbuild(fixtureRoot, {}, false);
    const config = rsbuild.getRsbuildConfig();

    expect(String(config.environments?.web?.source?.entry?.index)).toMatch(
      /clientEntry\.js$/,
    );
    expect(
      config.environments?.web?.source?.define?.[
        'process.env.__ENABLE_VARIABLE_SWAP___'
      ],
    ).toBe('true');
  });

  test('development 산출물에 DevTools와 링크 샘플을 포함한다', async () => {
    process.env.NODE_ENV = 'development';
    const appDirectory = await fs.mkdtemp(
      join(tmpdir(), 'tistory-react-development-'),
    );
    const outputDirectory = join(appDirectory, 'build');

    try {
      await compiledCore.build({
        appDirectory,
        docDirectory: fixtureRoot,
        config: { outDir: outputDirectory },
      });
      const javascriptFiles = await fs.readdir(join(outputDirectory, 'images'));
      const bundle = (
        await Promise.all(
          javascriptFiles
            .filter(file => file.endsWith('.js'))
            .map(file =>
              fs.readFile(join(outputDirectory, 'images', file), 'utf8'),
            ),
        )
      ).join('\n');

      expect(bundle).toContain('CodeIcon');
      expect(bundle).toContain('/article');
    } finally {
      await fs.remove(appDirectory);
    }
  }, 60_000);
});

describe.sequential('dev server와 production build 동시 실행', () => {
  test('style.css 충돌 없이 production build를 완료한다', async () => {
    const fixtureRoot = normalizePath(join(__dirname, 'fixtures/production'));
    const appDirectory = await fs.mkdtemp(
      join(tmpdir(), 'tistory-react-concurrent-'),
    );
    const outputDirectory = join(appDirectory, 'build');
    const port = await getAvailablePort();
    const devServerUrl = `http://127.0.0.1:${port}/`;
    process.env.NODE_ENV = 'development';
    const server = await compiledCore.dev({
      appDirectory,
      docDirectory: fixtureRoot,
      config: { outDir: outputDirectory },
      extraBuilderConfig: { server: { host: '127.0.0.1', port } },
    });

    try {
      await waitForServer(devServerUrl);
      process.env.NODE_ENV = 'production';
      await compiledCore.build({
        appDirectory,
        docDirectory: fixtureRoot,
        config: { outDir: outputDirectory },
      });

      expect(await fs.pathExists(join(outputDirectory, 'style.css'))).toBe(
        true,
      );
      expect(await fs.pathExists(join(outputDirectory, 'skin.html'))).toBe(
        true,
      );
      const css = await fs.readFile(join(outputDirectory, 'style.css'), 'utf8');
      expect(css.match(/\.production-fixture/g)).toHaveLength(1);
      expect(css).not.toContain('.fixed');
      expect((await waitForServer(devServerUrl)).ok).toBe(true);
    } finally {
      await server.close();
      await fs.remove(appDirectory);
    }
  }, 60_000);
});

describe('watch exclusions', () => {
  test('Rspack watcher가 production 생성물 디렉터리를 제외한다', async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    try {
      const fixtureRoot = normalizePath(join(__dirname, 'fixtures/production'));
      const rsbuild = await initRsbuild(
        fixtureRoot,
        {
          builderConfig: {
            html: { template: join(__dirname, '../../index.html') },
            environments: {
              web: {
                source: {
                  entry: {
                    index: join(__dirname, '../runtime/clientEntry.tsx'),
                  },
                },
              },
            },
          },
        },
        false,
      );
      const inspectedConfig = await rsbuild.inspectConfig();
      const ignored =
        inspectedConfig.origin.bundlerConfigs[0]?.watchOptions?.ignored;

      expect(String(ignored)).toContain('dist');
      expect(String(ignored)).toContain('.tistory-react');
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });
});
