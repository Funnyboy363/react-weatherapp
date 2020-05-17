import React from 'react';

const Weather = (props) => {
    return (
        <div className="container">
        <div className="cards pt-4 mt-5">
       <h3>{props.city}</h3>
        <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-0`}></i>
        </h5>
       {props.temp_celsius ? (<h1 className="py2">
            {props.temp_celsius}&deg;
        </h1>) : null}

        {props.ftemp_farenheit ? (<h1 className="py2">
            {props.ftemp_farenheit}&deg;
        </h1>) : null}
        {/* show max and min temp */}
        {minmaxTemp(props.temp_min, props.temp_max)}
        {minmaxTemp2(props.ftemp_min, props.ftemp_max)}
    <h4 className="py-3">{props.description}</h4>
        </div>
        </div>
    );
};


function minmaxTemp(min, max){
    if(min && max) {
        return ( <h3>
            <span className="px-4">{min}&deg;C</span>
            <span className="px-4">{max}&deg;C</span>
        </h3>);
    }
}

function minmaxTemp2(min, max){
    if(min && max) {
        return ( <h3>
            <span className="px-4">{min}&deg;F</span>
            <span className="px-4">{max}&deg;F</span>
        </h3>);
    }
}

export default Weather;
