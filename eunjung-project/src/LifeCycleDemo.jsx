import React, { useEffect, useState } from 'react';

export default function LifecycleDemo() {
  const [count, setCount] = useState(0);

  // 마운트 시 실행 (componentDidMount)
  useEffect(() => {
    console.log('컴포넌트가 마운트됨');

    return () => {
      console.log('컴포넌트가 언마운트됨');
    };
  }, []);

  // 업데이트 시 실행 (componentDidUpdate)
  useEffect(() => {
    if (count !== 0) {
      console.log('count가 업데이트됨:', count);
    }
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
