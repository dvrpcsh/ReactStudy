import CheckBox from './controlledComponents/CheckBox';
import Select from './controlledComponents/Select';
import TextArea from './controlledComponents/TextArea';
import TextInput from './controlledComponents/TextInput';
import UnControlledTextInput from './controlledComponents/UnControlledTextInput';

function App() {
    return (
        <div className = "App">
            <div>
                <TextInput />
            </div>
            <div>
                <TextArea />
            </div>
            <div>
                <Select />
            </div>
            <div>
                <CheckBox />
            </div>
            <div>
                <UnControlledTextInput />
            </div>
        </div>
    )
}

export default App;