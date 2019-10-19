import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart }  from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      /*alert("passwords don't match"); */
      setErrorMessage("passwords don't match");
      return;
    }

    signUpStart(email, password, displayName);
  };
    
  const handleChange = event => {
    const { value, name } = event.target; 
    setCredentials({ ...userCredentials, [name]: value });
    
    if(errorMessage) {
      setErrorMessage('');
    }
  }
  
  return(
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={ handleSubmit }>
      <FormInput 
          name='displayName' 
          type='text' 
          value={ displayName }
          handleChange={ handleChange } 
          required
          label='Display Name' 
        />
        <FormInput 
          name='email' 
          type='email' 
          value={ email }
          handleChange={ handleChange } 
          required
          label='Email' 
        />
        
        <FormInput 
          name='password' 
          type='password' 
          value={ password } 
          handleChange={ handleChange }
          required
          label='Password' 
        />
        <FormInput 
          name='confirmPassword' 
          type='password' 
          value={ confirmPassword } 
          handleChange={ handleChange }
          required
          label='Confirm Password' 
        />
        { /* Display error message */
          errorMessage ?
          <div className='error'>{ errorMessage }</div>
          :
          null
        }
        <div className='buttons'>
          <CustomButton type='submit'>Sign Up</CustomButton>
        </div>
      </form>
    </div>
  ); 
}
  
const mapDispatchToProps = dispatch =>({
  signUpStart: (email, password, displayName) => 
      dispatch(signUpStart({email, password, displayName}))
});

export default connect(null, mapDispatchToProps)(SignUp);
