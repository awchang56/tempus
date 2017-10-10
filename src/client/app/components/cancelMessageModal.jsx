import React from 'react';
import {Modal, Card, Input, Button} from 'semantic-ui-react';

const CancelMessageModal = (props) => (
  <Modal
    open={props.messageBoxOpen}
    onClose={props.handleMessageBoxClose}
  >
    <Modal.Description>
      <Card fluid>
        <Card.Content>
          <Card.Header>Message to Patient: </Card.Header>
          <Card.Description>
            <Input
              fluid
              onChange={props.handleCancelMessage}
              placeholder="Write a message to the patient here..."
            >
            </Input>
            <Button
              color="red"
              fluid
              onClick={props.handleDeleteAppt}
            >
              Cancel Appt
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>
    </Modal.Description>
  </Modal>
);

export default CancelMessageModal;
