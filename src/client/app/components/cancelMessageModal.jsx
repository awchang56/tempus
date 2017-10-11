import React from 'react';
import {Modal, Card, Input, Button} from 'semantic-ui-react';

const CancelMessageModal = props => (
  <Modal open={props.cancelModalOpen} onClose={props.handleCancelModalClose}>
    <Modal.Description>
      <Card fluid>
        <Card.Content>
          <Card.Header>Message to Patient: </Card.Header>
          <Card.Description>
            <Input
              fluid
              onChange={props.handleCancelModalMessage}
              placeholder="Write a message to the patient here..."
            />
            <Button color="red" fluid onClick={props.handleCancelAppt}>
              Cancel Appt
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>
    </Modal.Description>
  </Modal>
);

export default CancelMessageModal;
