import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

const countryOptions = [
    '한국',
    '중국',
    '일본',
    '러시아',
    '미국'
];

function QuestionForm() {
    const [formValue, setFormValue] = useState({
        name: '',
        country: 'default',
        address: ''
    });

    function handleChange(event){
        const {name, value} = event.target;
        setFormValue((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function submitForm(){
        alert(`Name: ${formValue.name}\nCountry: ${formValue.country}\nAddress: ${formValue.address}`);
    }

    return(
        <form onSubmit={submitForm}>
            <div className="App">
                <div className="form">
                    <div className="form-item">
                        <h1>1.이름이 무엇인가요?</h1>
                        <TextInput name="name" value={formValue.name} onChange={handleChange}/>
                    </div>
                    <div className="form-item">
                        <h1>2.사는 곳은 어디인가요?</h1>
                        <Select name="country" value={formValue.country} countryOptions={countryOptions} onChange={handleChange}/>
                    </div>
                    <div className="form-item">
                        <h1>2-1. 한국 어디에 사나요?</h1>
                        <TextInput name="address" value={formValue.address} onChange={handleChange}/>
                    </div>
                    <div className="button-group">
                        <button type="submit">저장</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default QuestionForm;
