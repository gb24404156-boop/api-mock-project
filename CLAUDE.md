# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

맛집 관리 시스템 - Next.js 15와 React 19를 사용한 프론트엔드 애플리케이션입니다. 사용자가 맛집을 등록, 조회, 삭제할 수 있으며, Postman Mock API를 백엔드로 사용합니다.

## 개발 명령어

### 개발 서버 실행
```bash
npm run dev
# or
pnpm dev
```
개발 서버는 http://localhost:3000에서 실행됩니다.

### 빌드
```bash
npm run build
# or
pnpm build
```

### 프로덕션 서버 실행
```bash
npm start
# or
pnpm start
```

### 린팅
```bash
npm run lint
# or
pnpm lint
```

## 기술 스택

- **프레임워크**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x (strict mode 활성화)
- **스타일링**: Tailwind CSS 4.x
- **UI 컴포넌트**: shadcn/ui (New York 스타일)
- **폼 관리**: React Hook Form + Zod
- **아이콘**: Lucide React
- **토스트 알림**: Sonner

## 프로젝트 구조 및 아키텍처

### 디렉토리 구조
```
app/                    # Next.js App Router 페이지
  ├── page.tsx         # 메인 페이지 (맛집 관리)
  ├── layout.tsx       # 루트 레이아웃
  └── globals.css      # 전역 스타일

components/
  ├── restaurant-form.tsx   # 맛집 등록 폼
  ├── restaurant-list.tsx   # 맛집 목록 표시
  ├── theme-provider.tsx    # 테마 제공자
  └── ui/              # shadcn/ui 컴포넌트들

hooks/                 # 커스텀 React 훅
lib/                   # 유틸리티 함수들
public/                # 정적 파일
```

### 핵심 아키텍처 패턴

#### 1. 클라이언트 컴포넌트 구조
모든 주요 컴포넌트는 `"use client"` 지시어를 사용합니다. Next.js App Router의 기본은 서버 컴포넌트이지만, 이 프로젝트는 상태 관리와 인터랙션이 많아 클라이언트 컴포넌트를 사용합니다.

#### 2. 상태 관리
- `app/page.tsx`에서 중앙 집중식 상태 관리
- `restaurants` 배열로 맛집 데이터 관리
- Mock API와의 동기화를 위해 로컬 상태를 즉시 업데이트하는 낙관적 UI 패턴 사용

#### 3. API 통합
- **API 엔드포인트**: `https://24d5f3f4-0575-41b0-bbf8-780027b63eed.mock.pstmn.io`
- Mock API는 데이터를 영구 저장하지 않으므로, 성공 응답 후 로컬 상태를 직접 업데이트
- `app/page.tsx:17`에 `API_BASE_URL` 상수 정의
- GET `/places` - 맛집 목록 조회
- POST `/places` - 맛집 등록
- DELETE `/places/:id` - 맛집 삭제

#### 4. 타입 시스템
```typescript
type Restaurant = {
  id: string
  name: string
  address: string
  phone: string
  category: string
  rating: number
}
```
이 타입은 `app/page.tsx:8`에 정의되어 있으며, 다른 컴포넌트에서 임포트하여 사용합니다.

#### 5. 폼 처리
- `restaurant-form.tsx`는 로컬 상태로 폼을 관리 (React Hook Form을 사용하지 않음)
- 제출 후 폼 초기화
- 제출 중 버튼 비활성화

#### 6. shadcn/ui 통합
- `components.json` 설정:
  - Style: "new-york"
  - RSC: true (React Server Components)
  - Path alias: `@/*`로 절대 경로 임포트
  - CSS variables를 사용한 테마 시스템
  - Icon library: lucide-react

#### 7. 빌드 설정
- `next.config.mjs`에서 TypeScript 빌드 에러 무시 설정 (`ignoreBuildErrors: true`)
- 이미지 최적화 비활성화 (`unoptimized: true`)

## 중요한 개발 고려사항

### Mock API 동작 방식
Mock API는 실제 데이터를 저장하지 않습니다. 따라서:
- POST 요청 성공 후 로컬 상태에 직접 추가 (`app/page.tsx:73`)
- DELETE 요청은 404를 반환할 수 있지만 로컬에서 삭제 처리 (`app/page.tsx:102`)
- 페이지 새로고침 시 데이터가 사라질 수 있음

### ID 생성
클라이언트에서 `Date.now().toString()`로 ID 생성 (`app/page.tsx:60`)

### 에러 핸들링
- toast를 사용한 사용자 친화적 에러 메시지
- 한국어 메시지 사용
- variant="destructive"로 에러 표시

### 스타일링 규칙
- Tailwind CSS 클래스 사용
- shadcn/ui 컴포넌트의 variant 시스템 활용
- CSS variables를 통한 다크모드 지원 (`app/globals.css`)

### 경로 별칭
- `@/` → 프로젝트 루트
- `@/components` → components 폴더
- `@/lib` → lib 폴더
- `@/hooks` → hooks 폴더

## 주의사항

- TypeScript strict mode가 활성화되어 있으므로 타입 안정성 유지 필요
- 모든 사용자 대면 텍스트는 한국어로 작성
- shadcn/ui 컴포넌트 추가 시 `components.json` 설정 참고
