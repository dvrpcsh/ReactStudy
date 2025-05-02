import React, { useEffect } from 'react';

function ClickEventListener() {
  useEffect(() => {
    console.log('컴포넌트가 마운트됨');

    const handleClick = () => {
      console.log('화면 아무 곳이나 클릭했습니다!');
    };

    // 이벤트 등록
    window.addEventListener('click', handleClick);
    console.log('addEventListener');

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      console.log('컴포넌트가 언마운트됨');
      window.removeEventListener('click', handleClick);
      console.log('removeEventListener');
    };
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>React Event Listener 예제</h2>
      <p>브라우저 화면을 아무 곳이나 클릭해보세요. 콘솔에 메시지가 뜹니다.</p>
    </div>
  );
}

export default ClickEventListener;