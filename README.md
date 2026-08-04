<div align="center">

  # @ienlab/tistory-react

  React.js 기반의 티스토리 스킨 개발 프레임워크

</div>

## 📌 소개 (Overview)

`@ienlab/tistory-react`는 React.js 및 Modern.js/Rsbuild 기술을 기반으로 티스토리(Tistory) 블로그 스킨을 선언적이고 효율적으로 개발할 수 있도록 돕는 프레임워크입니다.

티스토리의 HTML 치환자(Replacement Tags)와 복잡한 스킨 구조를 React 컴포넌트로 손쉽게 다룰 수 있으며, 번들링부터 최적화된 스킨 자산(`index.xml`, `skin.html`, `style.css` 등) 생성까지 자동으로 처리합니다.

---

## ✨ 주요 기능 (Features)

- ⚡ **React 기반 스킨 개발**: JSX/TSX 문법과 React 컴포저블 패턴을 활용하여 티스토리 스킨 UI를 빠르게 구축
- 🧩 **전용 컴포넌트 제공**: Article, Comment, Sidebar, List, Paging, Guestbook 등 티스토리 치환자에 대응하는 전용 컴포넌트 모음 제공
- 🛠️ **개발 서버 & HMR**: `dev` 명령을 통해 실시간 변경 사항을 바로 확인할 수 있는 HMR(Hot Module Replacement) 지원
- 🎨 **Tailwind CSS v4 지원**: 최신 Tailwind CSS v4가 내장된 템플릿 환경 제공
- 📦 **원스톱 스킨 빌드**: `build` 명령 수행 시 스킨 등록에 필요한 `index.xml`, `skin.html`, `style.css` 자산 자동 생성
- 🔍 **DevTools 제공**: 개발 중 실제 티스토리 환경 데이터를 모킹하고 시각적으로 검증할 수 있는 가이드 툴 포함

---

## 🚀 시작하기 (Getting Started)

### 1. 프로젝트 생성

`create-tistory-react` CLI 명령으로 새 티스토리 스킨 프로젝트를 생성합니다.

```bash
# npm
npm create @ienlab/tistory-react@latest

# pnpm
pnpm create @ienlab/tistory-react@latest

# yarn
yarn create @ienlab/tistory-react@latest
```

### 2. 개발 서버 실행

개발 환경 서버를 띄우고 실시간으로 스킨을 개발합니다.

```bash
npm run dev
```

### 3. 스킨 빌드

티스토리 블로그 스킨 등록에 사용할 최종 자산을 빌드합니다.

```bash
npm run build
```

빌드가 완료되면 `build/` (또는 설정된 출력 디렉터리) 경로에 `index.xml`, `skin.html`, `style.css` 및 `images/` 폴더가 생성됩니다.

---

## 📦 패키지 구조 (Packages)

본 프로젝트는 모노레포(Monorepo)로 구성되어 있습니다:

| 패키지 | 설명 |
| :--- | :--- |
| **`@ienlab/tistory-react`** (`packages/cli`) | 메인 CLI 도구 (`dev`, `build` 명령 제공) |
| **`@ienlab/tistory-react-component`** (`packages/component`) | 티스토리 치환자 대응 React 컴포넌트 라이브러리 |
| **`@ienlab/tistory-react-core`** (`packages/core`) | 스킨 번들링 및 개발 서버 핵심 로직 |
| **`@ienlab/tistory-react-devtool`** (`packages/devtool`) | 개발용 모킹 가이드 UI 및 DevTools |
| **`@ienlab/create-tistory-react`** (`packages/create-tistory-react`) | 프로젝트 생성 스캐폴딩 CLI (`npm create`) |
| **`@ienlab/tistory-react-eslint-plugin`** (`packages/eslint-plugin`) | 티스토리 스킨 개발용 린트 규칙 |
| **`@ienlab/tistory-react-runtime`** (`packages/runtime`) | 런타임 바인딩 및 헬퍼 함수 |

---

## 🎨 샘플 스킨 레이아웃 구조 (Sample Layout Specification)

`examples/ts` 샘플 스킨의 각 레이아웃 영역별 배경색 및 클래스 명세입니다:

| 영역 (Layout Region) | 클래스 (Class) | 배경색 (Background) | 테두리 (Border) |
| :--- | :--- | :--- | :--- |
| **헤더 영역 (Header)** | `.area_header` | `#eff6ff` (Soft Blue) | `#dbeafe` |
| **메인 콘텐츠 영역 (Main)** | `.site-main` | `#ffffff` (White Card) | `#e2e8f0` |
| **사이드바 영역 (Sidebar)** | `.site-sidebar` | `#f8fafc` (Soft Slate Card) | `#e2e8f0` |
| **푸터 영역 (Footer)** | `.area_footer` | `#f1f5f9` (Light Slate) | `#e2e8f0` |

---

## 📄 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)에 따라 자유롭게 사용할 수 있습니다.
