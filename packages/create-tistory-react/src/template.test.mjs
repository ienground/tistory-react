import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const templateRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../template',
);

async function readTemplateFile(relativePath) {
  return readFile(path.join(templateRoot, relativePath), 'utf8');
}

test('생성 템플릿이 공개된 최신 tistory-react 버전을 사용한다', async () => {
  const packageJson = JSON.parse(await readTemplateFile('package.json'));

  assert.equal(packageJson.dependencies['tistory-react'], '^0.0.14-alpha.0');
});

test('생성 템플릿이 Tailwind CSS v4 PostCSS 구성을 제공한다', async () => {
  const packageJson = JSON.parse(await readTemplateFile('package.json'));
  const postcssConfig = await readTemplateFile('postcss.config.mjs');

  assert.match(packageJson.devDependencies.tailwindcss, /^\^4\./);
  assert.match(packageJson.devDependencies['@tailwindcss/postcss'], /^\^4\./);
  assert.ok(packageJson.devDependencies.postcss);
  assert.match(postcssConfig, /['"]@tailwindcss\/postcss['"]/);
});

test('생성 템플릿이 Tailwind 전역 CSS를 레이아웃에서 불러온다', async () => {
  const globalCss = await readTemplateFile('src/index.css');
  const layout = await readTemplateFile('src/Layout.tsx');

  assert.match(globalCss, /@import\s+['"]tailwindcss['"]/);
  assert.match(layout, /import\s+['"]\.\/index\.css['"]/);
});
