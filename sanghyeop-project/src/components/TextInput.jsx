/*
컴포넌트의 state와 입력 값을 실시간으로 동기화 함
하지만 값이 변경되는 매 순간 렌더링을 함
*/
function TextInput({value, setValue}) {
    console.log("rendering");
    return (
        <input
          type="text"
          value={value}
          onChange= {(e) => {
            setValue(e.target.value);
          }}
        />;
    )
}

export default TextInput;