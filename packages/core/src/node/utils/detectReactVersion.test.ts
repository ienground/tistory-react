import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { detectReactVersion, resolveReactAlias } from './detectReactVersion';

describe('React dependency resolution', () => {
  const projectRoot = path.resolve(__dirname, '../../../../../examples/ts');

  test('사용자 프로젝트에 설치된 React 버전을 탐지한다', async () => {
    await expect(detectReactVersion(projectRoot)).resolves.toBe(19);
  });

  test('사용자 프로젝트의 React 패키지로 alias를 만든다', async () => {
    const alias = await resolveReactAlias(19, true, projectRoot);

    expect(alias.react).toContain('/examples/ts/node_modules/react/');
    expect(alias['react-dom/server']).toContain(
      '/examples/ts/node_modules/react-dom/',
    );
  });
});
