import React, {useState} from 'react';
import './Question.css';
import { Button, Radio } from 'antd';

function Question({color, question, answers, correct, onComplete}) {

    const [selection, setSelection] = useState(null) ;

    const handleButtonClick = () => {
       onComplete(selection === correct) ;
    } ;

    const onChange = e => {
        setSelection(e.target.value)
    } ;

    return (
        <div className='question-container'>
            <div className={'question-block ' + color}>
                <p>{question}</p>
                <Radio.Group onChange={onChange} value={selection}>
                    {answers.map((item, index) => (
                        <p key={index}>
                            <Radio value={index}>{item}</Radio>
                        </p>
                    ))}
                </Radio.Group>

                <Button type="primary" block onClick={handleButtonClick}>Ответить</Button>
            </div>
        </div>
    )
}

export default Question ;