import React, { Component } from 'react';

import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
require(`brace/theme/terminal`);
require(`brace/mode/sh`);
require(`brace/snippets/sh`);

export class LogsModalBox extends Component {
    render() {
        const props = this.props;
        return (
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                size="lg"
                className={`modal-${props.variant} ` + this.props.className}
            >
                <ModalHeader toggle={props.toggle}> Terminal </ModalHeader>
                <ModalBody>
                    <AceEditor
                        width="100%"
                        theme="terminal"
                        mode="sh"
                        value={props.message}
                    ></AceEditor>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color={props.variant}
                        onClick={props.onClear}
                    >
                        Clear
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
