import React from 'react';
import {Card, Grid, Icon, Button} from 'semantic-ui-react';
import moment from 'moment';

const validateAppt = appt => {
  console.log('appt: ', appt);
  if (appt.isCancelled) {
    return {borderBottom: 'medium solid red'};
  } else if (
    appt.isConfirmedByDoctor &&
      appt.isConfirmedByPatient &&
      (moment(appt.date).diff(moment()) > 0)
  ) {
    return {borderBottom: 'medium solid green'};
  } else if (
    (appt.isConfirmedByDoctor || appt.isConfirmedByPatient) &&
      (moment(appt.date).diff(moment()) > 0)
  ) {
    return {borderBottom: 'medium solid orange'};
  } else {
    return {borderBottom: 'medium solid black'};
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
          style={validateAppt(appt)}
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
                  </Card.Description>
                </Grid.Column>
                <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                  <span>
                    <Button icon="delete calendar" />
                    <Button icon="file" />
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
