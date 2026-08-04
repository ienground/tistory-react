<div align="center">

  # @ienlab/tistory-react 

  A fast tistory skin framework with React.js.
</div>

## Features

- 개발 환경 최적화: 개발 환경에서 개발을 도와주는 가이드를 제공합니다.
- 작업 최소화: 빌드시 스킨 등록에 필요한 xml, html, css, js 파일을 만듭니다.
- 컴포넌트 제공: 모든 티스토리 치환자를 React 컴포넌트로 제공합니다.
- Tailwind CSS 지원: 생성 템플릿에서 Tailwind CSS v4를 바로 사용할 수 있습니다.

## Getting Started

1. Create via CLI
```bash
$ npm create @ienlab/tistory-react@latest # npm
$ yarn create @ienlab/tistory-react@latest # yarn
$ pnpm create @ienlab/tistory-react@latest # pnpm
```

2. Start Dev Server
```bash
$ npm run dev
```

3. Build in Production
```bash
$ npm run build
```


## Layout Region Background Colors (영역별 배경 색상)

샘플 스킨(`examples/ts`)의 각 레이아웃 영역이 직관적으로 구분되도록 적용된 배경색 명세입니다:

| 영역 (Layout Region) | 클래스 (Class) | 배경색 (Background) | 테두리 (Border) |
| :--- | :--- | :--- | :--- |
| **헤더 영역 (Header)** | `.area_header` | `#eff6ff` (Soft Blue) | `#dbeafe` |
| **메인 콘텐츠 영역 (Main)** | `.site-main` | `#ffffff` (White Card) | `#e2e8f0` |
| **사이드바 영역 (Sidebar)** | `.site-sidebar` | `#f8fafc` (Soft Slate Card) | `#e2e8f0` |
| **푸터 영역 (Footer)** | `.area_footer` | `#f1f5f9` (Light Slate) | `#e2e8f0` |

## License
