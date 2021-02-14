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
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}





// thirdComponent 
function ThirdComponent(){
  return (
    <div className="thirdComponent">
      Third Component
    </div>
  )
}

export default App;