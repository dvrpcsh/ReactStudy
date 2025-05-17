import { useState } from 'react';
import TextInput from './components/TextInput';
import Select from './components/Select';

const countryOptions = [
    '한국',
    '중국',
    '일본',
    '러시아',
    '미국'
];

function App() {
    const [formValue, setFormValue] = useState({
        name: '',
        country: '',
        address: ''
    });

    return(
        <div className="App">
            <div className="form">
                <div className="form-item">
                    <h1>1.이름이 무엇인가요?</h1>
                    <TextInput />
                </div>
                <div className="form-item">
                    <h1>2.사는 곳은 어디인가요?</h1>
                    <Select />
                </div>
                <div className="form-item">
                    <h1>2-1. 한국 어디에 사나요?</h1>
                    <TextInput />
                </div>
                <div className="button-group">
                    <button>저장</button>
                </div>
            </div>
        </div>
    )
}

export default App;
