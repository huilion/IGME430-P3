import React from 'react';
const helper = require('./helper.js');
import { Form, FloatingLabel, Button } from 'react-bootstrap';

function ReactForm(props) {
  return (
    <>
    <Form
    onSubmit={(e) => handleEntries(e, props.triggerReload)}
    action="/main"
    method="POST"
    >
    <FloatingLabel
        controlId="floatingInput"
        label="Title"
        className="mb-3"
      >
        <Form.Control id="title" type="text" placeholder="Entry Title" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingDate" label="Date">
        <Form.Control id="date" type="date" placeholder="Date" />
      </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Entry">
            <Form.Control
            id="entry"
            as="textarea"
            placeholder="what are you thinking about?"
            style={{ height: '100px' }}
            />
        </FloatingLabel>
        <Button type="submit">Publish Entry</Button>
    </Form>
    </>
  );
}

const handleEntries = (e, onEntryAdded) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector("#title").value;
    const entry = e.target.querySelector("#entry").value;
    const date = e.target.querySelector("#date").value;

    if(!title || !entry || !date) {
        helper.handleError("All fields are required");
        return false;
    }

    helper.sendPost(e.target.action, {title, entry, date}, onEntryAdded);
    return false;
}

export default ReactForm;