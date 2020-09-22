import React from 'react';
import './Car.css';
import {MAX_POINTS} from "../config";

function Car({color, active, scale, position, onClick}) {
    const wheel = <div className={active && position < MAX_POINTS ? 'wheel active' : 'wheel'}/> ;

    const p = Math.min(Math.max(position, 0), MAX_POINTS) ;
    const percent = Math.round(p / MAX_POINTS * 100) ;
    const translateX = position < MAX_POINTS ? percent : 0 ;

    const cup = position < MAX_POINTS ? null : <div className='cup'/> ;

    return (
        <div style={{transform:`scale(${scale})`, marginLeft:`${percent * 0.8}%`}} className='car-body' onClick={onClick}>
            <div className={'car ' + color} style={{transform:`translateX(${-translateX}%)`}}>
                {wheel}
                {wheel}
                {cup}
                <div className='car-label'>{position}</div>
            </div>
        </div>
    )
}

export default Car ;