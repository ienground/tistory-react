import { tmpdir } from 'node:os';
import { join } from 'node:path';
import fs from '@ienlab/tistory-react-shared/fs-extra';
import { describe, expect, test } from 'vitest';

import type { UserConfig } from '@ienlab/tistory-react-shared';
import { bundleXml, renderHtml } from './build';
import { OUTPUT_DIR } from './constants';
import { initRsbuild } from './initRsbuild';
import { normalizePath } from './utils';

describe('bundleXml', async () => {
  const testDir = normalizePath(join(__dirname, 'fixtures'));

  const getXmlConfig = async (config: UserConfig): Promise<string> => {
    await bundleXml(testDir, config);
    const xmlConfigPath = join(testDir, OUTPUT_DIR, 'index.xml');
    return await fs.readFile(xmlConfigPath, 'utf-8');
  };

  test('Should Generate Default XML When UserConfig Object Is Empty', async () => {
    const xml = await getXmlConfig({});
    expect(xml).toMatchInlineSnapshot(`
    "<?xml version="1.0" encoding="utf-8"?>
    <skin>
        <information>
            <name/>
            <version/>
            <description><![CDATA[]]></description>
            <license><![CDATA[]]></license>
        </information>
        <author>
            <name/>
            <homepage/>
            <email/>
        </author>
        <default>
            <recentEntries>5</recentEntries>
            <recentComments>5</recentComments>
            <recentTrackbacks>5</recentTrackbacks>
            <itemsOnGuestbook>10</itemsOnGuestbook>
            <tagsInCloud>30</tagsInCloud>
            <sortInCloud>3</sortInCloud>
            <expandComment>0</expandComment>
            <expandTrackback>0</expandTrackback>
            <lengthOfRecentNotice>25</lengthOfRecentNotice>
            <lengthOfRecentEntry>27</lengthOfRecentEntry>
            <lengthOfRecentComment>30</lengthOfRecentComment>
            <lengthOfRecentTrackback>30</lengthOfRecentTrackback>
            <lengthOfLink>30</lengthOfLink>
            <showListOnCategory>1</showListOnCategory>
            <showListLock>1</showListLock>
            <tree>
                <color>000000</color>
                <bgColor>ffffff</bgColor>
                <activeColor>000000</activeColor>
                <activeBgColor>eeeeee</activeBgColor>
                <labelLength>27</labelLength>
                <showValue>1</showValue>
            </tree>
            <contentWidth>0</contentWidth>
        </default>
    </skin>"
    `);
  });

  test('Should Convert to CDATA When Specific Property Is Present', async () => {
    const xml = await getXmlConfig({
      skinInfoConfig: { information: { description: 'test' } },
    });
    expect(xml).toContain('<description><![CDATA[test]]></description>');
    const xml2 = await getXmlConfig({
      skinInfoConfig: { information: { license: 'test' } },
    });
    expect(xml2).toContain('<license><![CDATA[test]]></license>');
  });

  test('Deepmerge', async () => {
    const xml = await getXmlConfig({
      skinInfoConfig: {
        information: { name: 'testName', description: 'testDescription' },
        author: { name: 'testName', homepage: 'testHomepage' },
        default: {
          recentTrackbacks: 10,
          tree: {
            color: 'ffffff',
            labelLength: 10,
          },
        },
      },
    });
    expect(xml).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="utf-8"?>
      <skin>
          <information>
              <name>testName</name>
              <version/>
              <description><![CDATA[testDescription]]></description>
              <license><![CDATA[]]></license>
          </information>
          <author>
              <name>testName</name>
              <homepage>testHomepage</homepage>
              <email/>
          </author>
          <default>
              <recentEntries>5</recentEntries>
              <recentComments>5</recentComments>
              <recentTrackbacks>10</recentTrackbacks>
              <itemsOnGuestbook>10</itemsOnGuestbook>
              <tagsInCloud>30</tagsInCloud>
              <sortInCloud>3</sortInCloud>
              <expandComment>0</expandComment>
              <expandTrackback>0</expandTrackback>
              <lengthOfRecentNotice>25</lengthOfRecentNotice>
              <lengthOfRecentEntry>27</lengthOfRecentEntry>
              <lengthOfRecentComment>30</lengthOfRecentComment>
              <lengthOfRecentTrackback>30</lengthOfRecentTrackback>
              <lengthOfLink>30</lengthOfLink>
              <showListOnCategory>1</showListOnCategory>
              <showListLock>1</showListLock>
              <tree>
                  <color>ffffff</color>
                  <bgColor>ffffff</bgColor>
                  <activeColor>000000</activeColor>
                  <activeBgColor>eeeeee</activeBgColor>
                  <labelLength>10</labelLength>
                  <showValue>1</showValue>
              </tree>
              <contentWidth>0</contentWidth>
          </default>
      </skin>"
      `);
  });
});

describe('renderHtml', () => {
  test('Rsbuild가 생성한 HTML 템플릿으로 skin.html을 만든다', async () => {
    const appDirectory = await fs.mkdtemp(join(tmpdir(), 'tistory-react-'));
    const outputDirectory = join(appDirectory, OUTPUT_DIR);
    const htmlTemplatePath = join(outputDirectory, 'index.html');

    try {
      await fs.ensureDir(outputDirectory);
      await fs.writeFile(
        htmlTemplatePath,
        '<html><head><!--<?- HEAD ?>--></head><body><!--<?- DOC_CONTENT ?>--></body></html>',
      );

      await renderHtml(appDirectory, {}, false);

      expect(
        await fs.readFile(join(outputDirectory, 'skin.html'), 'utf8'),
      ).toContain('<html lang="ko">');
      expect(await fs.pathExists(htmlTemplatePath)).toBe(false);
    } finally {
      await fs.remove(appDirectory);
    }
  });

  test('임시 티스토리 속성을 실제 치환자 속성으로 복원한다', async () => {
    const appDirectory = await fs.mkdtemp(join(tmpdir(), 'tistory-react-'));
    const outputDirectory = join(appDirectory, OUTPUT_DIR);
    const htmlTemplatePath = join(outputDirectory, 'index.html');

    try {
      await fs.ensureDir(outputDirectory);
      await fs.writeFile(
        htmlTemplatePath,
        '<html><head><!--<?- HEAD ?>--></head><body><a data-tistory-attribute="[##_prev_page_##]">이전</a><!--<?- DOC_CONTENT ?>--></body></html>',
      );

      await renderHtml(appDirectory, {}, false);

      const skinHtml = await fs.readFile(
        join(outputDirectory, 'skin.html'),
        'utf8',
      );
      expect(skinHtml).toContain('<a [##_prev_page_##]>이전</a>');
      expect(skinHtml).not.toContain('data-tistory-attribute');
    } finally {
      await fs.remove(appDirectory);
    }
  });
});

describe('client base path', () => {
  test('base 경로를 정규화해 클라이언트 환경에 전달한다', async () => {
    const projectRoot = normalizePath(
      join(__dirname, '../../../../examples/ts'),
    );
    const rsbuild = await initRsbuild(projectRoot, { base: 'blog/' }, false);
    const config = rsbuild.getRsbuildConfig();

    expect(
      config.environments?.web?.source?.define?.['process.env.__BASE__'],
    ).toBe('"/blog"');
  });
});
