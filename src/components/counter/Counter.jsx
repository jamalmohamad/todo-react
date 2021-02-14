import React from 'react';
import './Counter.css'

function CounterComponent() {
    return (
        <div className="counter">
            <button onClick={increment}>+1</button>
            <span className="count">0</span>
        </div>
    )
};

function increment() {
    console.log('increment')
}

export default CounterComponent;