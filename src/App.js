import React ,{Component}from 'react';

import './App.css';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};




class App extends Component {

  constructor(props){
    super(props);

    this.state= {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      formErrors :{
        firstName:"",
        lastName: "",
        email:"",
        password:""
      }
    };

  }

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)){
      console.log(`
        SUBMITTING

        FirstName :${this.state.firstName}
        LastName :${this.state.lastName}
        Email :${this.state.email}
        Password :${this.state.password}
        `

      );
    }
    else{
      console.error("INVALID FORM");
    }
  };

  handleChange= e =>{
    e.preventDefault();
    const {name, value} =e.target;

    let formErrors= this.state.formErrors;

    //console.log("Name:",value);
    switch(name)
    {
      case 'firstName':
        formErrors.firstName=value.length<3  ?
        "minimum 3 characters required" : "";
        break;
      case 'lastName':
            formErrors.lastName=value.length<3  ?
            "minimum 3 characters required" : "";
            break;
      case 'email':
        formErrors.email=
        emailRegex.test(value)  ?  '': 'enter valid email address';
                break;

      case 'password':
                    formErrors.password=value.length<6  ?
                    "minimum 6 characters required" : "";
                    break;
      
      default:
        break;
 
    }

    this.setState({formErrors,[name]:value},()=>console.log(this.state));

  };
  render(){

    const { formErrors }= this.state;
  return (
    <div className="wrapper">
      <div className="form-wrapper">

        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate>

          <div className="firstName">
            <label htmlFor="firstName">First Name:</label>
            <input  noValidate 
            className={formErrors.firstName.length>0?"error":null}
             name="firstName" 
             onChange={this.handleChange}
             placeholder="First Name"></input>

             {formErrors.firstName.length>0 &&(
               <span className="errorMessage">
                 { 
                     formErrors.firstName
                 }

               </span>
             )}


          </div>
          



          <div className="lastName">
            <label htmlFor="">Last Name:</label>
            <input  noValidate className={formErrors.lastName.length>0?"error":null}
             name="lastName" 
             onChange={this.handleChange}
             placeholder="Last Name"></input>
             {formErrors.lastName.length>0 &&(
               <span className="errorMessage">
                 { 
                     formErrors.lastName
                 }

               </span>
             )}
          </div>


          <div className="email">
            <label htmlFor="email">Email:</label>
            <input  noValidate className={formErrors.email.length>0?"error":null}
             name="email" 
             onChange={this.handleChange}
             placeholder="Email"></input>
             {formErrors.email.length>0 &&(
               <span className="errorMessage">
                 { 
                     formErrors.email
                 }

               </span>
             )}
          </div>

          <div className="password">
            <label htmlFor="password">Password:</label>
            <input  noValidate className={formErrors.password.length>0?"error":null}
             name="password" 
             onChange={this.handleChange}
             placeholder="Password"></input>
             {formErrors.password.length>0 &&(
               <span className="errorMessage">
                 { 
                     formErrors.password
                 }

               </span>
             )}
          </div>
          <div className="createAccount">
            <button type="submit" >Create Account</button>
            <small>Already have an Account?</small>
          </div>


        </form>
      


      </div>
     
    </div>
  );
  }
}

export default App;
