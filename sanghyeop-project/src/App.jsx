import {useState} from 'react';
import FunctionalCpnt from './presentationExample/FunctionalComponent';
import MyComponent from './presentationExample/MyComponent';

function App() {
    const [toggle, setToggle] = useState(true);

    return (
        <>
            {toggle && <MyComponent />}
            {toggle || <FunctionalCpnt />}
            <hr />

            <button
                onClick={() => setToggle((t) => !t)}
            > toggle </button>
        </>
    )
}

export default App;