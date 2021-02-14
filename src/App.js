import React, { Component  } from 'react';
import CounterComponent from './components/counter/Counter';
import FirstComponent from './components/learning-examples/FirstComponent';
import './App.css';

function App() {
    return (
        <div className="App">
            {/* <p>I am using function component</p>
            <FirstComponent></FirstComponent> */}
            <CounterComponent></CounterComponent>
        </div>
    );
}

export default App;