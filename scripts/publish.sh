#!/usr/bin/env bash
set -e

echo "🚀 의존성 확인 중..."
npm install

TAG="${1:-alpha}"

echo "🔨 [1/8] @ienlab/tistory-react-shared 빌드 및 배포..."
(cd packages/shared && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [2/8] @ienlab/tistory-react-runtime 빌드 및 배포..."
(cd packages/runtime && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [3/8] @ienlab/tistory-react-component 빌드 및 배포..."
(cd packages/component && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [4/8] @ienlab/tistory-react-devtool 빌드 및 배포..."
(cd packages/devtool && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [5/8] @ienlab/tistory-react-core 빌드 및 배포..."
(cd packages/core && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [6/8] @ienlab/tistory-react-eslint-plugin 빌드 및 배포..."
(cd packages/eslint-plugin && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [7/8] @ienlab/create-tistory-react 빌드 및 배포..."
(cd packages/create-tistory-react && npx modern build && npm publish --access public --tag "$TAG")

echo "🔨 [8/8] @ienlab/tistory-react (CLI) 빌드 및 배포..."
(cd packages/cli && npx modern build && npm publish --access public --tag "$TAG")

echo "🎉 모든 패키지 배포 완료!"
