import React, { useState } from 'react';

export default function UseStateExample2() {
    const [names, setNames] = useState(['AAA', 'BBB', 'CCC']);
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleUpload = () => {
        setNames((prev) => (
            [...prev, input] 
        ));
    } 

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange}/>
            <button onClick={handleUpload}>Upload</button>
            {names.map((name, index) => (
                <p key={index}>{name}</p>
            ))}
        </div>
    );
}