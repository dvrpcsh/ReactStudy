import React, { useEffect, useLayoutEffect, useState } from 'react';

function LayoutVsEffect() {
  const [color, setColor] = useState('lightblue');

  useLayoutEffect(() => {
    console.log('useLayoutEffect 실행'); // DOM 조작 전에 실행됨
  }, [color]);

  useEffect(() => {
    console.log('useEffect 실행'); // 브라우저 페인팅 후 실행됨
  }, [color]);

  return (
    <div style={{ backgroundColor: color, padding: '20px' }}>
      <p>현재 색상: {color}</p>
      <button onClick={() => setColor(color === 'lightblue' ? 'lightgreen' : 'lightblue')}>
        색상 변경
      </button>
    </div>
  );
}

export default LayoutVsEffect;