import React, { Component  } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage  } from 'formik';


class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: 'Learn Forms',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);   
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {
        console.log(values);
    }


    validate(values){
       // let errors = {description: 'Should have atleast 5 char'}
       // console.log(values);
      //  return errors;

      let errors = {}
      if(!values.description) {
          errors.description = 'Enter a description'

      } else if(values.description.length < 5){
          errors.description = 'Enter atleast 5 Characters in description'
      }


      if(!moment(values.targetDate).isValid()) {
          errors.targetDate =  'Enter a valid Target Date'
      }

      return errors


    }

    render() {
        let {description, targetDate} = this.state   // called destructuring

        //let targetDate = this.state.targetDate
        return <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                initialValues={{description, targetDate}}
                onSubmit={this.onSubmit}
                validate = {this.validate}
                validateOnChange={false} // or true
                validateOnBlur = {false} // or true
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>

                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            </div>            
                }


}


export default TodoComponent;