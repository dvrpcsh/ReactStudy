import React, { useState, useEffect } from 'react';

// useState, useEffect 예제

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  console.log('컴포넌트 렌더링됨, count =', count);

  const handleClick = () => {
    console.log('버튼 클릭됨');

    setCount(count + 1); // 비동기 상태 변경
    console.log('setCount 호출 직후 count =', count);

    setLog((prev) => [...prev, `버튼 클릭 - count: ${count}`]);
  };

  useEffect(() => {
    console.log('useEffect 실행됨, count =', count);
    setLog((prev) => [...prev, `useEffect 실행 - count: ${count}`]);
  }, [count]);

  return (
    <div>
      <h1>실험실</h1>
      <button onClick={handleClick}>Count 증가</button>
      <p>현재 count: {count}</p>
      <hr />
      <h3>로그:</h3>
      <ul>
        {log.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
