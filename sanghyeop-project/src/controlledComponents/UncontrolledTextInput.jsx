import { useRef } from 'react';

function UncontrolledTextInput() {
    const inputRef = useRef();

    console.log('[UncontrolledTextInput] render');
    //document.querySelector('#input').value
    //useRef -> 특정 DOM을 가져옴

    return (
        <>
            <input ref={inputRef} type="text" id="input" />
            <button
              onClick={() => {
                console.log(inputRef.current.value);
              }}
            > Get value
            </button>
        </>
    )
}

export default UncontrolledTextInput;