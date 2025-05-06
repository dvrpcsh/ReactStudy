import CheckBox from './components/CheckBox';
import Select from './components/Select';
import TextArea from './components/TextArea';
import TextInput from './components/TextInput';
import UnControlledTextInput from './components/UnControlledTextInput';

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