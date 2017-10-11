import React from 'react';
import AppointmentsList from './AppointmentsList.jsx';
import AddAppointment from './AddAppointment.jsx';
import AddAppointmentForm from './AddAppointmentForm.jsx';
import {Grid, Card} from 'semantic-ui-react';

const Appointments = props => (
  <Grid.Row>
    <Grid.Column width={16} textAlign="left">
      <Card.Group>
        {props.addAppointmentFormOpen ? (
          <AddAppointmentForm
            patient={props.patient}
            handleUpdateAppts={props.handleUpdateAppts}
            userType={props.userType}
          />
        ) : (
          <AddAppointment
            renderAddAppointmentForm={props.renderAddAppointmentForm}
          />
        )}
        <AppointmentsList
          patient={props.patient}
          appointments={props.appointments || []}
          handleCancelAppt={props.handleCancelAppt}
          handleCancelModalOpen={props.handleCancelModalOpen}
          handleConfirmAppt={props.handleConfirmAppt}
          userType={props.userType}
        />
      </Card.Group>
    </Grid.Column>
  </Grid.Row>
);

export default Appointments;
