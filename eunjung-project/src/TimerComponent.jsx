import React, { useEffect } from 'react';

function TimerComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 동작 중...');
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('타이머 정리됨');
    };
  }, []);

  return <div>타이머 실행 중... 콘솔 확인!</div>;
}

export default TimerComponent;
