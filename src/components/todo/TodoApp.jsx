import { render } from '@testing-library/react';
import React, { Component  } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


// Switch ensures only one component is active 
class TodoApp extends Component {
    render() {
        return(
            <div className="TodoApp">
                {/* My Todo Application */}

                <HeaderComponent />
                <Router>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent} />
                        <Route  path="/todos" component = {ListTodosComponent} />
                        <Route  component={ErrorComponent}/>
                    </Switch>
                </Router>
                <FooterComponent />
            </div>
        )
    }
}


class HeaderComponent extends Component {
    render() {
        return (
            <div>
                Header <hr/>
            </div>
        )
    }
}


class FooterComponent extends Component {
    render() {
        return (
            <div>
                Footer <hr/>
            </div>
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
                <table>
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
                                <tr>
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



class WelcomeComponent extends Component {
    render() {
        return (
            // if we use <a> it will load the whole page, this is not part of SPA so we will use <Link to /> 
            <div>Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link> </div>
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