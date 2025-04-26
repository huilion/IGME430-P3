const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './components.jsx'
import SignupWindow from './Signup.jsx';


const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    if (!username || !pass) {
        helper.handleError('Username or password is empty');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});
    return false;
}


const LoginReact = (props) => {
    return(
        <div>
            <Form
            id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            >
                <FloatingLabel
                controlId="floatingUser"
                label="Username"
                className="mb-3"
                >
                    <Form.Control id="user" type="text" placeholder="Username"/>
                </FloatingLabel>
                <FloatingLabel
                controlId="floatingPass"
                label="Password"
                className="mb-3"
                >
                    <Form.Control id="pass" type="text" placeholder="Password"/>
                </FloatingLabel>
            <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}
  

  const App = () => {
    const [showSignup, setShowSignup] = React.useState(false);
  
    const handleShow = () => setShowSignup(true);
    const handleClose = () => setShowSignup(false);
  
    return (
      <>
        <NavBar />
        <div className="mainForm">
          <LoginReact />
            <p>Don't have an account?</p>
            <Button variant="outline-primary" onClick={handleShow}>Sign Up</Button>
        <Modal show={showSignup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create an Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignupWindow />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>
    );
  };
  

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render(<App />);
}

// const init = () => {
//     const loginButton = document.getElementById('loginButton');
//     const signupButton = document.getElementById('signupButton');

//     const root = createRoot(document.getElementById('content'));

//     loginButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         root.render(<LoginWindow />);
//         return false;
//     });
    
//     signupButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         root.render(<SignupWindow />);
//         return false;
//     });

//     root.render(<LoginWindow />);
// }

window.onload = init;