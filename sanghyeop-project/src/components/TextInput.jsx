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

제목

내용


