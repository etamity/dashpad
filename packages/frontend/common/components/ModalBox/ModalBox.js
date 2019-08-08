import React, {Component} from 'react';

import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

export class ModalBox extends Component {
    render() {
        const props = this.props;
        return (
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                className={`modal-${props.variant} ` + this.props.className}
            >
                <ModalHeader toggle={props.toggle}> {props.title}</ModalHeader>
                <ModalBody>
                    {props.message}
                </ModalBody>
                <ModalFooter>
                    <Button color={props.variant} onClick={()=>{
                        props.toggle && props.toggle()
                        props.onConfirm && props.onConfirm()
                    }}>
                        Confirm
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
};