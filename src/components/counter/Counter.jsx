import React, {Component} from 'react';
import './Counter.css'

 class Counter extends Component {

    // Define the initial state in a construct
    // state => counter 0
    
    // define initial state in constructor
    constructor () {
        super();
        this.state = {
            counter : 0
        }

        this.increment = this.increment.bind(this);

    }

    // lambda, anonymous function
    // 
    render () {
        return (
            <div className="counter">
                <button onClick={this.increment}>+ {this.props.by}</button>
                <span className="count" style={{color: "red"}}>{this.state.counter}</span>
            </div>
        )
    }

    increment() {
        console.log('increment');
        this.setState({
            counter: this.state.counter + this.props.by
        });
    };
}

 



export default Counter;