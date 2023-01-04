import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HTMLReactParser from 'html-react-parser';
import {MODAL_ACTION_CLOSE  , MODAL_ACTION_CONFIRM} from '../../utillities/constant'
const  ConfirmModal = (props) => {

    const {title , content , show , onAction} = props;

  return (
    // khi nhận được dữ liệu là show là true thì layout sẽ hiện 
      <Modal
       show={show}
       onHide={() => onAction(MODAL_ACTION_CLOSE)}
       backdrop = 'static'
       >
        <Modal.Header closeButton>
          <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmModal;