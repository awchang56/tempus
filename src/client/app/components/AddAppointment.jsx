import React from 'react';
import {Card, Icon} from 'semantic-ui-react';

const AddAppointment = (props) => (
  <Card fluid onClick={props.renderAddAppointmentForm}>
    <Card.Content textAlign="center">
      <Icon name="plus" size="huge" color="teal" />
    </Card.Content>
  </Card>
);

export default AddAppointment;
