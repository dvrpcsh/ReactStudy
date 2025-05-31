# React Router, Redux, Recoil 및 SPA 작동 원리 종합 정리

## 1. React Router

### 1.1 개념 및 역할
- **SPA** 환경에서 URL에 따라 컴포넌트를 렌더링하는 클라이언트 사이드 라우팅 라이브러리
- 브라우저 주소(history API) 변화를 감지해 해당 경로의 컴포넌트를 보여줌

### 1.2 주요 컴포넌트 & 사용 예시
```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* 공통 내비게이션 */}
      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
      </nav>

      {/* 경로 설정 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// 동적 경로 파라미터 사용 예시
function UserProfile() {
  const { id } = useParams();
  return <div>사용자 ID: {id}</div>;
}
```

### 1.3 동작 원리
1. `<Link>` 클릭 → 브라우저 URL 변경  
2. `BrowserRouter`가 이벤트 수신  
3. `Routes` 내부의 `Route`와 매칭 → 해당 `element` 렌더링

### 1.4 장단점
- **장점**
  - 선언적 라우팅(직관적 JSX)  
  - 동적·중첩 라우트 지원  
  - 코드 스플리팅, 리다이렉트 등 풍부한 기능
- **단점**
  - 초기 설정 복잡  
  - SSR 구성 시 추가 작업 필요

---

## 2. Redux

### 2.1 개념 및 역할
- 전역 상태를 **단일 스토어**에 저장하고, **Action → Reducer** 순으로 일관성 있게 관리
- Flux 아키텍처를 단순화

### 2.2 핵심 요소 & 예시
```js
// 액션 정의
const increment = amount => ({ type: 'INCREMENT', payload: amount });

// 리듀서 정의
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    default:
      return state;
  }
}

// 스토어 생성
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(counter, applyMiddleware(thunk));

// 디스패치 사용 예시
store.dispatch(increment(5));
```

### 2.3 장단점
- **장점**
  - 예측 가능한 상태 흐름  
  - Redux DevTools 등 디버깅 도구  
  - 미들웨어를 통한 비동기·로깅 지원
- **단점**
  - 보일러플레이트 다수  
  - 작은 앱엔 오버헤드  
  - 불변성(immutable) 관리 직접 필요

---

## 3. Recoil

### 3.1 개념 및 역할
- Facebook 제작의 React 전용 상태 관리 라이브러리
- **Atom**(상태 단위)과 **Selector**(파생 상태)로 상태 관리
- React Hooks 기반

### 3.2 핵심 개념 & 예시
```js
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atom 정의
const countState = atom({
  key: 'countState',
  default: 0,
});

// Selector 정의 (파생 상태)
const doubleCount = selector({
  key: 'doubleCount',
  get: ({ get }) => get(countState) * 2,
});

// 컴포넌트에서 사용
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  const doubled = useRecoilValue(doubleCount);
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

### 3.3 장단점
- **장점**
  - Hook 기반 선언적 API  
  - 컴포넌트 구독 최적화  
  - 파생 상태 관리 편리
- **단점**
  - 생태계·자료 부족  
  - 구조 설계 복잡도  
  - DevTools 기능 제한

---

## 4. Redux vs Recoil 비교 요약

| 특성          | Redux                         | Recoil                            |
|-------------|-------------------------------|-----------------------------------|
| 상태 저장소   | 단일 Store                    | 다수 Atom                         |
| 업데이트 방식 | Action → Reducer → State      | useSetRecoilState 직접 업데이트   |
| 비동기 처리   | Thunk/Saga 미들웨어 활용     | Selector 내 비동기 지원           |
| 불변성 관리   | 직접 관리(또는 Immer 사용)   | 내부 proxy 활용                   |
| 학습 곡선     | Flux 개념 이해 필요          | React Hooks 경험만으로 진입 가능  |
| DevTools     | 강력한 Redux DevTools         | Recoil Profiler(제한적)           |

---

## 5. SPA (Single Page Application)

### 5.1 SPA 개념
- 초기 한 번의 HTML/CSS/JS 번들 로딩 후, 클라이언트에서 라우팅과 부분 렌더링을 수행
- 전체 페이지 리로드 없이 화면 전환

### 5.2 MPA vs SPA 비교

| 구분              | MPA (멀티 페이지)                 | SPA (싱글 페이지)                 |
|------------------|-----------------------------------|-----------------------------------|
| 페이지 전환 방식   | 서버에 매번 HTML 요청 후 전체 리로드 | 클라이언트 라우터로 부분 렌더링      |
| 네트워크 요청     | HTML + 리소스 매번 요청            | 초기 번들 이후 API(JSON) 요청만 반복 |
| 사용자 경험 (UX)  | 페이지 로딩 지연                   | 부드럽고 빠른 전환                |
| 구현 복잡도       | 단순하지만 파일 관리 많음           | 라우터/상태 관리 라이브러리 필요   |

### 5.3 SPA 동작 원리

1. **초기 번들 로딩**  
   - `index.html` 로드 후 React 앱 번들 전체 다운로드
2. **클라이언트 사이드 라우팅**  
   - `<Link>` 클릭 시 `history.pushState`로 URL만 변경 → `popstate` 이벤트 → 해당 컴포넌트 렌더링
3. **가상 DOM 차이 계산**  
   - 변경된 컴포넌트만 Virtual DOM 비교 후 실제 DOM 업데이트
4. **데이터 요청**  
   - 필요 데이터만 API(Fetch/Axios)로 JSON 형태로 가져옴
5. **코드 스플리팅 (옵션)**  
   - `React.lazy` + `Suspense`로 청크별 로드, 초기 번들 크기 최적화

### 5.4 SPA 예시 (React Router 사용)

```jsx
// App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
      </nav>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

### 5.5 SPA 렌더링 예시

```jsx
<BrowserRouter>
  <Header />         {/* 공통 레이아웃, 네트워크 요청 없음 */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
  <Footer />         {/* 공통 레이아웃, 네트워크 요청 없음 */}
</BrowserRouter>
```

- `/` → `/about` 이동 시  
  - **네트워크**: `About` 컴포넌트 청크(`About.js`) 최초 로드 + API 호출(데이터 요청)  
  - **렌더링**: `<Header>`, `<Footer>` 유지, `<Home>` → `<About>` 부분만 업데이트

---

**끝.**
