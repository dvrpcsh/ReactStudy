import {useEffect, useState} from 'react';

function FunctionalComponent() {
    console.log("컴포넌트 실행");
    const [value, setValue] = useState(0);

    useEffect(() => {
        console.log("useEffect[] 최초 실행 : 컴포넌트가 마운트 될 때 한 번만 실행");

        return () => {
            console.log("useEffect[] 실행되기 전 실행됨 컴포넌트가 언마운트 될 때 실행");

            /*
            document.body.addEventListener (
                'click', () => {
                    console.log("클릭이벤트");
                }
            )
            */
        }
    }, []);

    useEffect(() => {
        console.log("useEffect[value] 최초 실행");

        /* 이벤트나 객체 자원 할당 해제*/
        return () => {
            console.log("useEffect[value] 실행되기 전 실행됨");
        }
    }, [value]);

    console.log("컴포넌트 렌더링 완료");

    return (
        <div>
            <h1>FunctionComponent</h1>
            <h1>value: {value}</h1>
            <button onClick={() => {
                setValue((state) => state+1);
            }}> Increase Value </button>
        </div>
    )
}

export default FunctionalComponent;