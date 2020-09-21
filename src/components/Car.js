import React from 'react';
import './Car.css';
import {MAX_POINTS} from "../config";

function Car({color, active, scale, position, onClick}) {
    const wheel = <div className={active ? 'wheel active' : 'wheel'}/> ;

    const getMargin = () => {
        let p = Math.min(Math.max(position, 0), MAX_POINTS) ;
        const percent = Math.round(p / MAX_POINTS * 100) ;
        return percent * 0.8;
    } ;

    return (
        <div style={{transform:`scale(${scale})`, marginLeft:`${getMargin()}%`}} className='car-body' onClick={onClick}>
            <div className={'car ' + color}>
                {wheel}
                {wheel}
                <div className='car-label'>{position}</div>
            </div>
        </div>
    )
}

export default Car ;