import React from 'react';
import {Card} from 'semantic-ui-react';
import moment from 'moment';

const AppointmentsList = (props) => (
  props.appointments
    .sort((a, b) => moment(b.date) - moment(a.date))
    .map((appt, i) => {
      return (
        <Card
          fluid
          key={i}
          style={
            appt.isComplete
              ? {borderBottom: 'medium solid green'}
              : {borderBottom: 'medium solid red'}
          }
        >
          <Card.Content>
            <Card.Header>{moment(appt.date).format('MMM DD, YYYY')}</Card.Header>
            <Card.Meta>{moment(appt.date).format('h:mm a')}</Card.Meta>
            <Card.Description>
              <p>
                <span style={{fontWeight: 'bold', color: 'teal'}}>Purpose: </span>
                <span style={{color: 'black'}}>{appt.purpose}</span>
              </p>
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
);

export default AppointmentsList;
