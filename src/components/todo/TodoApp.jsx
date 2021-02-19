import { render } from '@testing-library/react';
import React, { Component  } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';


// Switch ensures only one component is active 
class TodoApp extends Component {
    render() {
        return(
            <div className="TodoApp">
                {/* My Todo Application */}
                <Router>
                <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent} />
                        <Route  path="/todos" component = {ListTodosComponent} />
                        <Route path="/logout" component={LogoutComponent} />
                        <Route  component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}


class HeaderComponent extends Component {    
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);


        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="localhost:3000" className="navbar-brand">in28Minutes</a></div>
                    <ul className="navbar-nav">
                        {
                            isUserLoggedIn &&
                            <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li> 
                        }
                        {
                            isUserLoggedIn &&
                            <li><Link className="nav-link" to="/todos">Todos</Link></li>
                        }
                    </ul>

                    <ul  className="navbar-nav navbar-collapse justify-content-end">
                        {
                            !isUserLoggedIn &&
                            <li><Link className="nav-link" to="/login">Login</Link></li>
                         }
                         {
                             isUserLoggedIn &&
                            <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
                         }
                    </ul>
                </nav>

            </header>
            
        )
    }
}


class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All rights reserved 2021 c</span>

            </footer>
        )
    }
}

class ListTodosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ListTodosComponent: 
            [ {id:1 , description: 'Learn React', done: false, targetDate: new Date()},
              {id: 2, description: 'Become an Expert', done: true, targetDate: new Date()},
              {id:3, description: 'visit india', done: false, targetDate: new Date()}]
        }
    }


    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>Target Date </th>
                        <th>Is Completed?</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.ListTodosComponent.map(todo => 
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                                )
                    
                        }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}


// error component - u can create it ith class or as a function component
class ErrorComponent extends Component {
    render() {
        return (
            <div>An error occured</div>
        )
    }
}


// if we use <a> it will load the whole page, this is not part of SPA so we will use <Link to /> 

class WelcomeComponent extends Component {
    render() {
        return (
            <>
            <h1>Welcome</h1>
            <div>Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link> </div>
            </>
        )
    }
}


class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for Using our application.
                </div>
            </>
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
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
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
                <h1>Login</h1>
                <div className="container">
                    <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                    <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
                    User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value = {this.state.password || ""} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

function ShowInvalidCredentials(props) {
    if(props.hasLoginFailed){
        return  <div className="alert alert-warning">Invalid Credentials</div>
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