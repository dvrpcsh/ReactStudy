import React, { useRef, useState } from 'react';

function ClickCounter() {
  const countRef = useRef(0);
  const [stateCount, setStateCount] = useState(0);

  console.log('🔄 컴포넌트 렌더링!');

  const handleClick = () => {
    countRef.current += 1;
    console.log('Ref Count:', countRef.current); // 렌더링 안 됨
    setStateCount(stateCount + 1); // 렌더링 발생
  };

  return (
    <div>
      <p>State Count: {stateCount}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default ClickCounter;