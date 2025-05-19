import React, { useState } from 'react';

// 복잡한 계산을 시뮬레이션하는 함수
const heavyWork = (value) => {
    console.log(value, '복잡한 계산 중...');
    let result = 0;
    for (let i = 0; i < 10; i++) result += i; // 복잡한 계산
    return result;
};

// 첫 번째 방식: useState(heavyWork)
export function App1() {
    const [value1, setValue1] = useState(heavyWork("매 렌더링마다")); // 매 렌더링마다 heavyWork() 호출

    const handleClick = () => {
        setValue1((prev) => prev + 1);
    };

    return (
        <div>
            <h1>첫 번째 방식: useState(heavyWork)</h1>
            <p>Value: {value1}</p>
            <button onClick={handleClick}>Increase Value</button>
        </div>
    );
}

// 두 번째 방식: useState(() => heavyWork())
export function App2() {
    const [value2, setValue2] = useState(() => heavyWork("첫 렌더링때만")); // 첫 렌더링 때만 heavyWork() 호출

    const handleClick = () => {
        setValue2((prev) => prev + 1);
    };

    return (
        <div>
            <h1>두 번째 방식: useState(() =&gt; heavyWork())</h1>
            <p>Value: {value2}</p>
            <button onClick={handleClick}>Increase Value</button>
        </div>
    );
}
