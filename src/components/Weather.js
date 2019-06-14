import React from "react";


const Weather = props => (
    <div className="weather__info">
        { 
            props.city && props.country && <p className="weather__key">Location: 
                <span className="weather__value"> { props.city }, { props.country }</span>
             </p>
        }
        {
            props.temperature && <p className="weather__key">Temperature:  
                <span className="weather__value"> { props.temperature }</span>
            </p>
        }
        { 
            props.humidity && <p className="weather__key">Humidity: 
                <span className="weather__value"> { props.humidity }</span>
            </p>
        }
        { 
            props.wind && <p className="weather__key">Wind: 
                <span className="weather__value"> { props.wind }</span>
            </p>
        }
        { 
            props.description && <p className="weather__key">Description: 
                <span className="weather__value"> { props.description }</span>
            </p>
        }
        { 
            props.outfit && <p className="weather__key">Outfit: 
                <span className="weather__value"> { props.outfit }</span>
            </p>
        }
        { 
            props.error && <p className="weather__error">Error:
                <span> { props.error}</span>
            </p>
        }
    </div>
);

export default Weather;