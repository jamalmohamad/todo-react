import React, { Component  } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class TodoApp extends Component {
    render() {
        return(
            <div className="TodoApp">
                My Todo Application

                <Router>
                    <Route path="/" exact    component={LoginComponent} />
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/welcome" component={WelcomeComponent} />
                </Router>
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>Welcome component</div>
        )
    }
}

class LoginComponent extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            username: 'in28Minutes',
            paswword: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        console.log(this.satate);
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    }

    loginClicked() {
        // console.log(this.state);
        if(this.state.username==='in28Minutes' && this.state.password==='dummy') {
            // redirect to welcome page

            console.log('Successful')
            this.props.history.push("/welcome")
            this.setState({showSuccessMessage: true})
            this.setState({hasLoginFailed: false})
        } else {
            console.log('Faild')
            this.setState({hasLoginFailed: true})
            this.setState({showSuccessMessage: false})
        }
     }


        handleUsernameChange(event) {
            console.log(event.target.value);
            this.setState({username: event.target.value})
        }


        handlePasswordChange(event) {
            console.log(event.target.value);
            this.setState({password: event.target.value})
        }


    render(){
        return (
            
            <div>
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
               <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value = {this.state.password || ""} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

function ShowInvalidCredentials(props) {
    if(props.hasLoginFailed){
        return  <div>Invalid Credentials</div>
    }
    return null;
}


function ShowSuccessMessage(props) {
    if(props.showSuccessMessage) {
        return  <div>Login Successful</div>
    }
    return null;
}
export default TodoApp;