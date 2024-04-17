import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
// import { Btn } from '../../AbstractElements';
// import { Close, SaveChanges } from '../../Constant';

const CommonModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggler} size={props.size} centered>
      <ModalHeader toggle={props.toggler}>
        {props.title}
      </ModalHeader>
      <ModalBody className={props.bodyClass}>
        {props.children}
      </ModalBody>
    </Modal>
  );
};

export default CommonModal;