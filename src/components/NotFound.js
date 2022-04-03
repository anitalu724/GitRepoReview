import React from 'react';
import '../css/App.css';

const NotFound = ({text}) => {
    return(
        <div className='notFound'>
            <h1>{text}</h1>
        </div>
    );
}
export default NotFound;