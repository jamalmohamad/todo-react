import React, { Component  } from 'react';
import Counter from './components/counter/Counter';
import FirstComponent from './components/learning-examples/FirstComponent';
import './App.css';

export default function App() {
    return (
        <div className="App">
            {/* <p>I am using function component</p>
            <FirstComponent></FirstComponent> */}
            <Counter></Counter>
        </div>
    );
}

// export default App;