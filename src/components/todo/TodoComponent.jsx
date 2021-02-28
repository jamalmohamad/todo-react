import React, { Component  } from 'react';
import axios from 'axios';


class TodoComponent extends Component {
    render() {
        return <div>Todo Component for id - {this.props.match.params.id}</div>
    }


}


export default TodoComponent;