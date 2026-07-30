import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

async function readPackageFile(relativePath) {
  return readFile(path.join(packageRoot, relativePath), 'utf8');
}

test('DevTools 스타일 빌드가 Tailwind CSS v4 PostCSS를 사용한다', async () => {
  const packageJson = JSON.parse(await readPackageFile('package.json'));
  const postcssConfig = await readPackageFile('postcss.config.mjs');

  assert.match(packageJson.devDependencies.tailwindcss, /^\^4\./);
  assert.match(packageJson.devDependencies['@tailwindcss/postcss'], /^\^4\./);
  assert.match(postcssConfig, /['"]@tailwindcss\/postcss['"]/);
});

test('DevTools CSS가 사용자 스킨에 Preflight를 주입하지 않는다', async () => {
  const css = await readPackageFile('src/index.css');

  assert.doesNotMatch(css, /@tailwind\s+base/);
  assert.match(css, /tailwindcss\/utilities\.css/);
});
