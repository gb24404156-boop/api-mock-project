# 맛집 관리 시스템

Next.js 15 + React 19 기반 맛집 관리 애플리케이션

## 구현 내용

- Postman Mock Server REST API 연동
- 맛집 CRUD (생성, 조회, 삭제)
- shadcn/ui 컴포넌트 라이브러리 사용
- TypeScript strict mode
- Tailwind CSS 스타일링
- Toast 알림 (Sonner)

## 기술 스택

- Next.js 16.0.3 (App Router)
- React 19.2.0
- TypeScript 5.x
- Tailwind CSS 4.x
- shadcn/ui (Radix UI)
- React Hook Form + Zod

## API 정보

**Base URL**
```
https://24d5f3f4-0575-41b0-bbf8-780027b63eed.mock.pstmn.io
```

**엔드포인트**
- `GET /places` - 맛집 목록 조회
- `POST /places` - 맛집 등록
- `DELETE /places/:id` - 맛집 삭제

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000

## 프로젝트 구조

```
app/
  ├── page.tsx          # 메인 페이지 (API 통신)
  ├── layout.tsx        # 루트 레이아웃
  └── globals.css       # 전역 스타일

components/
  ├── restaurant-form.tsx    # 맛집 등록 폼
  ├── restaurant-list.tsx    # 맛집 리스트
  └── ui/                    # shadcn/ui 컴포넌트
```

## 특징

- Mock API 서버 연동으로 실제 백엔드 없이 동작
- 낙관적 UI 업데이트로 빠른 사용자 경험
- 클라이언트 사이드 상태 관리

