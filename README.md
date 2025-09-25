# 🍶 담아가세 - 맞춤 추천 플랫폼

<div align="center">

**당신에게 맞는 전통주를 찾아드립니다** ✨

![Vue](https://img.shields.io/badge/Vue.js-3.5.21-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.12.2-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

## 📋 프로젝트 소개

**담아가세**는 사용자의 질문을 바탕으로 맞춤형 추천을 하는 웹 애플리케이션입니다.
전통주, 지역, 특산물의 매력을 더 많은 사람들이 쉽고 재미있게 경험할 수 있도록 돕는 것이 목표입니다.
*현재는 전통주만 서비스 가능합니다.

### ✨ 주요 기능
*현재는 전통주만 서비스 가능합니다.
- 🎯 **맞춤형 추천**: 나이, 성별, 음주 빈도를 기반한 개인화된 전통주 추천
- 🍽️ **푸드 페어링**: 선택한 전통주와 어울리는 음식 추천
- 📊 **통계 분석**: 사용자 데이터 기반 통계 시각화
- 🎨 **직관적 UI**: 깔끔하고 사용하기 쉬운 인터페이스

## 🛠️ 기술 스택

### Frontend

- **Vue.js 3** - Composition API와 `<script setup>` 활용
- **TypeScript** - 타입 안정성과 개발 생산성
- **Vite** - 빠른 개발 서버와 빌드
- **Vue Router 4** - 라우팅 관리
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **ECharts + Vue-ECharts** - 데이터 시각화

### Development Tools

- **Prettier** - 코드 포매팅
- **Axios** - HTTP 클라이언트

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/SKALA-jumocase/jumocase-client-ver2.git
cd jumocase-client-ver2

# 의존성 설치
pnpm i

# 개발 서버 시작
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview
```

## 📁 프로젝트 구조

```
src/
├── router/             # Vue Router 설정
├── views/              # 페이지 컴포넌트
│   ├── Home.vue       # 메인 페이지
│   ├── Result.vue     # 추천 결과 페이지
│   └── Statistics.vue # 통계 페이지
├── components/         # 재사용 가능한 컴포넌트
│   ├── forms/         # 폼 컴포넌트
│   ├── modal/         # 모달 컴포넌트
│   ├── layout/        # 레이아웃 컴포넌트
│   └── ui/            # UI 컴포넌트
├── composables/        # Vue 3 Composition API
├── services/           # API 서비스
├── types/              # TypeScript 타입 정의
└── assets/             # 정적 리소스
```

## 🖼️ 주요 화면

### 메인 페이지

- 사용자 기본 정보 입력 모달
- 전통주, 특산물, 지역 정보 폼

### 추천 결과 페이지

- AI 기반 맞춤형 전통주 추천 목록
- 선택한 전통주와 어울리는 음식 페어링

### 통계 페이지

- 사용자 데이터 기반 시각화된 통계

## 🤖 API 연동

이 프로젝트는 **Axios**를 사용하여 백엔드 API(`localhost:8005`)와 연동되어 다음 기능을 제공합니다:

- `POST /liquors/recommendations` - 전통주 추천
- `GET /liquors/{liquor_id}/pairings` - 음식 페어링
- `GET /recommendations` - 추천 기록 조회

### API 클라이언트
- **Base URL**: `http://localhost:8005`
- **HTTP 클라이언트**: Axios v1.12.2
- **Content-Type**: `application/json`

## 👥 개발팀

| 개발자        | GitHub                                     |
| ------------- | ------------------------------------------ |
| **Jamoooong** | [@Jamooooong](https://github.com/Jamooooong) |
| **kshin9**    | [@kshin9](https://github.com/kshin9)       |

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

---

<div align="center">
  <strong> 거짓 없는 ai 추천 서비스 "담아가세" </strong>
</div>
