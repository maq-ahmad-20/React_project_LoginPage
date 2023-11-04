import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {

    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: "", isValid: false }
}
const collegeReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {

    return { value: action.val, isValid: action.val.trim().length > 3 }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 3 }
  }

  return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'Password_input') {

    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'Password_validate') {

    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: "", isValid: false }
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

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

  };
  const collegeChangeHandler = (event) => {

    dispatchCollege({ type: 'USER_INPUT', val: event.target.value })


  };

  const passwordChangeHandler = (event) => {

    dispatchPassword({ type: "Password_input", val: event.target.value })


  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Password_validate" })
  };
  const validateCollegeHandler = () => {
    dispatchCollege({ type: 'INPUT_BLUR' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div
          className={`${classes.control} ${collegeState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>


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
