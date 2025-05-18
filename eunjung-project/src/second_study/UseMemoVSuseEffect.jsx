import React, { useState, useEffect, useMemo } from 'react';

// 무거운 계산 함수 (예시)
function slowFunction(num) {
  console.log('⚙️ Heavy calculation running...');
  let result = 0;
  for (let i = 0; i < 100; i++) {
    result += num;
  }
  return result;
}

function UseMemoVSuseEffect() {
  const [input, setInput] = useState(1);

  // 🔹 useMemo 방식
  const memoizedResult = useMemo(() => {
    console.log("from useMemo");
    return slowFunction(input);
  }, [input]);

  // 🔹 useEffect 방식
  const [effectResult, setEffectResult] = useState(0);
  useEffect(() => {
    console.log("from useEffect");
    const result = slowFunction(input);
    setEffectResult(result);
  }, [input]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h2>React useMemo vs useEffect - 계산 캐싱 비교</h2>

      <div>
        <label>Input: </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </div>

      <hr />

      <div>
        <h3>📌 useMemo 방식</h3>
        <p>결과: {memoizedResult}</p>
      </div>

      <div>
        <h3>📌 useEffect 방식</h3>
        <p>결과: {effectResult}</p>
      </div>
    </div>
  );
}

export default UseMemoVSuseEffect;