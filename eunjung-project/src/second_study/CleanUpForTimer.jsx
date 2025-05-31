import React, { useState, useEffect } from 'react';

export default function CleanUpForTimer() {
    const [showTimer, setShowTimer] = useState(false);

    return (
        <div>
            {showTimer && <Timer />}
            <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
        </div>
    );
}


export const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 돌아가는 중...');
        }, 1000);

        //타이머를 다 쓰고 정리하는 작업(클린업)
        return () => {
            clearInterval(timer);
            console.log('타이머가 종료되었습니다.');
            
        };

    }, []);

    return (
        <div>
            <span>타이머를 시작합니다. 콘솔을 보세요!</span>
        </div>
    );
};