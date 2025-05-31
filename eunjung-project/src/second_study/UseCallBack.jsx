// `someFunction` is memoized using `useCallback`. 
// As long as variable `number` doesn't change, 
// `someFunction` remains the same and doesn't get recreated.
// Therefore, the `useEffect` that depends on `someFunction` doesn't run 
//unless `number` changes.
// This behavior is an example of memoization with `useCallback`


//Key Point !!
//useCallback is used to avoid unnecessary recreation of functions on every re-render of a component.
//It returns the same function instance as long as its dependencies don't change.
//This is especially useful when passing functions as props to child components,
//as it helps prevent unnecessary re-renders of those children.

import React, { useCallback, useEffect, useState } from 'react';

export default function UseCallBack() {
    const [number, setNumber] = useState(0);
    const [toggle, setToggle] = useState(true);

    const someFunction = useCallback(() => {
        console.log(`someFunc: number: ${number}`);
        return;
    }, [number]);

    useEffect(() => {
        console.log("someFunction이 변경되었습니다.");
    }, [someFunction]);

    return (
        <div>
            <input 
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
            <br />
            <button onClick={someFunction}>Call someFunc</button>
        </div>
    );
}
