import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactForm from './Form.jsx';

function WriteButton({triggerReload}) {
  const [show, setShow] = useState(false);
  const [reloadJournals, setReloadJournals] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id="writeButton" variant="" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ReactForm triggerReload={() => {
              triggerReload();
               handleClose();
               }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WriteButton;