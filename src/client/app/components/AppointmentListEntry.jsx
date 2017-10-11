import React from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import moment from 'moment';

const AppointmentListEntry = props => (
  <Card fluid style={props.renderApptColor(props.appt)}>
    <Card.Content>
      <Card.Header>
        {moment(props.appt.date).format('MMM DD, YYYY')}
      </Card.Header>
      <Card.Meta>{moment(props.appt.date).format('h:mm a')}</Card.Meta>
      <Grid>
        <Grid.Row>
          <Grid.Column width={13} verticalAlign="middle">
            <Card.Description>
              <p>
                <span style={{fontWeight: 'bold', color: 'teal'}}>
                  Purpose:{' '}
                </span>
                <span style={{color: 'black'}}>{props.appt.purpose}</span>
              </p>
              {props.appt.message ? (
                <p>
                  <span style={{fontWeight: 'bold', color: 'teal'}}>
                    Message to Patient:{' '}
                  </span>
                  <span style={{color: 'black'}}>{props.appt.message}</span>
                </p>
              ) : null}
            </Card.Description>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign="middle" textAlign="right">
            <span>
              <Button
                icon="delete calendar"
                onClick={() => {
                  if (props.userType === 'patient' || props.appt.isCancelled) {
                    props.handleCancelAppt(props.appt);
                  } else {
                    props.handleCancelModalOpen(props.appt);
                  }
                }}
              />
              <Button
                icon={props.validateApptConfirmation(props.appt)}
                onClick={() => props.handleConfirmAppt(props.appt)}
              />
            </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
);

export default AppointmentListEntry;
