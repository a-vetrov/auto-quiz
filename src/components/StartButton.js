import React from 'react';
import './StartButton.css';

function StartButton({onStart}) {

    return (
        <div className='start-button-container'>
            <div className='start-button' onClick={onStart} />
        </div>
    )
}

export default StartButton ;