import React from 'react';
const helper = require('./helper.js');
import { Form, FloatingLabel, Button } from 'react-bootstrap';

// Send the post request for making a new account
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector("#user").value;
    const pass = e.target.querySelector("#pass").value;
    const pass2 = e.target.querySelector("#pass2").value;

    if (!username || !pass || !pass2) {
        helper.handleError("All fields are required");
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});

    return false;
}

// Signup window, this is within the modal
const SignupWindow = () => {
    return (
      <Form
        id="signupForm"
        name="signupForm"
        className="signup-form"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
      >
        <FloatingLabel controlId="signupUser" label="Username" className="mb-3">
          <Form.Control id="user" type="text" name="username" placeholder="Username" />
        </FloatingLabel>
        <FloatingLabel controlId="signupPass" label="Password" className="mb-3">
          <Form.Control id="pass" type="password" name="pass" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel controlId="signupPass2" label="Confirm Password" className="mb-3">
          <Form.Control id="pass2" type="password" name="pass2" placeholder="Re-enter Password" />
        </FloatingLabel>
        <Button type="submit">Sign Up</Button>
      </Form>
    );
  };

  export default SignupWindow;