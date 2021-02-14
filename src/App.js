import React, { Component  } from 'react';
import logo from './logo.svg';
import './App.css';

import MyFirstComponent from './MyComponent';

class App extends Component {
  render() {
    return(
      <div className="App">
        My Hello World

        <FirstComponent></FirstComponent>
        <MyFirstComponent></MyFirstComponent>
      </div>
    );
  }
}



class FirstComponent extends Component {
  render(){
    return (
      <div className="firstComponent">
        My First Component
      </div>
    )
  }
}


export default App;