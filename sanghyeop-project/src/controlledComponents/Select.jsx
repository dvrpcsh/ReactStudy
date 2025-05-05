import { useState } from 'react';

function Select() {
    const [value, setValue] = useState('react');

    console.log('[Select] render', value);

    return(
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
        </select>

    )
}

export default Select;