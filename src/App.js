import React, { Component  } from 'react';
import Counter from './components/counter/Counter';
import FirstComponent from './components/learning-examples/FirstComponent';
import TodoApp from './components/todo/TodoApp';
import './App.css';
import './bootstrap.css';

export default function App() {
    return (
        <div className="App">
            {/* <p>I am using function component</p>
            <FirstComponent></FirstComponent> */}
            {/* <Counter by={1}></Counter>
            <Counter by={5}></Counter>
            <Counter by={10}></Counter> */}

            <TodoApp />
        </div>
    );
}

// export default App;