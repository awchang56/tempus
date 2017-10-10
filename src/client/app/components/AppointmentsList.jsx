import React from 'react';
import {Card, Grid, Icon, Button, Form, Input, Modal, TextArea} from 'semantic-ui-react';
import moment from 'moment';

const renderApptColor = appt => {
  if (
    appt.isCancelled &&
      (moment(appt.date).diff(moment()) > 0)
  ) {
    return {borderBottom: 'medium solid red'};
  } else if (
    appt.isConfirmedByDoctor &&
      appt.isConfirmedByPatient &&
      (moment(appt.date).diff(moment()) > 0)
  ) {
    return {borderBottom: 'medium solid green'};
  } else if (
    ((appt.isConfirmedByDoctor || appt.isConfirmedByPatient) &&
      (moment(appt.date).diff(moment()) > 0)) || (
        (!appt.isConfirmedByDoctor && !appt.isConfirmedByPatient) &&
        (moment(appt.date).diff(moment()) > 0)
      )
  ) {
    return {borderBottom: 'medium solid orange'};
  } else {
    return {borderBottom: 'medium solid black'};
  }
};

const validateApptConfirmation = appt => {
  if (appt.isConfirmedByPatient && appt.isConfirmedByDoctor) {
    return 'star';
  } else if (!appt.isConfirmedByDoctor && !appt.isConfirmedByPatient) {
    return 'empty star';
  } else {
    return 'star half empty';
  }
};

const AppointmentsList = (props) => (
  props.appointments
    .sort((a, b) => moment(b.date) - moment(a.date))
    .map((appt, i) => {
      return (
        <Card
          fluid
          key={i}
          style={renderApptColor(appt)}
        >
          <Card.Content>
            <Card.Header>
              {moment(appt.date).format('MMM DD, YYYY')}
            </Card.Header>
            <Card.Meta>{moment(appt.date).format('h:mm a')}</Card.Meta>
            <Grid>
              <Grid.Row>
                <Grid.Column width={13} verticalAlign="middle">
                  <Card.Description>
                    <p>
                      <span style={{fontWeight: 'bold', color: 'teal'}}>Purpose: </span>
                      <span style={{color: 'black'}}>{appt.purpose}</span>
                    </p>
                    {
                      appt.message ? (
                        <p>
                          <span style={{fontWeight: 'bold', color: 'teal'}}>Message to Patient: </span>
                          <span style={{color: 'black'}}>{appt.message}</span>
                        </p>
                        ) : null
                    }
                  </Card.Description>
                </Grid.Column>
                <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                  <span>
                    <Button
                      icon="delete calendar"
                      onClick={() => {
                        if (props.userType === 'patient' || appt.isCancelled) {
                          props.handleDeleteAppt(appt);
                        } else {
                          props.handleMessageBoxOpen(appt);
                        }
                      }}
                    />
                    <Button icon="file" />
                    <Button icon={validateApptConfirmation(appt)} onClick={() => props.handleConfirmAppt(appt)} />
                  </span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      )
    })
);

export default AppointmentsList;
