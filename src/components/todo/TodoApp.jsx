import { render } from '@testing-library/react';
import React, { Component  } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import HelloWorldService from '../../api/todo/HelloWorldService';
import TodoDataService from '../../api/todo/TodoDataService';


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
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute  path="/todos" component = {ListTodosComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route  component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
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
            ListTodosComponent: [],
             message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);

    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    console.log(response);
                    this.setState({ListTodosComponent: response.data})
                }
            )
    }


    componentDidMount() {
       this.refreshTodos();

    }


    componentWillUnmount() {
        console.log('componenWillUnmount')
    }


    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        console.log(nextProps);
        console.log(nextState);
        return true;  // if set to false the view will not load the data
    }



    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName();
        // console.log(id, username)
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message: `Delete of todo ${id}`})
                    this.refreshTodos()
                }
            )
    }


    render() {
        return (
            <div>
                <h1>List Todos</h1>
               {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>Target Date </th>
                        <th>Is Completed?</th>
                        <th>Delete</th>
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
                                    <td><button className="btn btn-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
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
    
    constructor(props){
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    render() {
        return (
            <>
            <h1>Welcome</h1>
            <div className="container">Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link> </div>
            <div className="container">
                Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
            </div>

            <div className="container">
                {this.state.welcomeMessage}
            </div>


            </>
        )
    }

    retrieveWelcomeMessage() {
        console.log('customized welcome');
        // HelloWorldService.executeHelloWorldService()
        //     .then(response => this.handleSuccessfulResponse(response))
        //     .catch(error => console.log(error));

        // HelloWorldService.executeHelloWorldBeanService()
        //     .then(response => this.handleSuccessfulResponse(response))
        //     .catch(error => console.log(error));
        
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error));
    }

    handleSuccessfulResponse(response) {
        console.log(response);
        this.setState({welcomeMessage:  response.data.message});     // very important, here i got the response then data then inside data I have {} objects inside I have message key 
    }

    handleError(error) {
        console.log(error.response);
        this.setState({welcomeMessage: error.response.data.error})
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