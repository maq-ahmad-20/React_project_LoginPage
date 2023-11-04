import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {

    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: state.value, isValid: state.isValid }
}
const collegeReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {

    return { value: action.val, isValid: action.val.trim().length > 3 }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 3 }
  }

  return { value: state.value, isValid: state.isValid }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {

    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'USER_BLUR') {

    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: state.value, isValid: state.isValid }
}

const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [enteredColllege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState()
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, { value: '', isValid: null })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState
  const { isValid: collegeIsValid } = collegeState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid && collegeIsValid
      );

    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier)
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid])

  const authCtx = useContext(AuthContext)

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

  };
  const collegeChangeHandler = (event) => {

    dispatchCollege({ type: 'USER_INPUT', val: event.target.value })


  };

  const passwordChangeHandler = (event) => {

    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })


  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };
  const validateCollegeHandler = () => {
    dispatchCollege({ type: 'INPUT_BLUR' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>


        <Input id="email" label="E-Mail" type="email" onChange={emailChangeHandler}
          onBlur={validateEmailHandler} value={emailState.value} isValid={emailIsValid} />

        <Input id="password" label="Password" type="password" onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} value={passwordState.value} isValid={passwordIsValid} />


        <Input id="college" label="College" type="text" onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler} value={collegeState.value} isValid={collegeIsValid} />


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
