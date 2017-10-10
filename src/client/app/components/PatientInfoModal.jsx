import React from 'react';
import {Modal, Grid, Header, Card, Icon, Form, Button} from 'semantic-ui-react';
import moment from 'moment';

import AppointmentsList from './AppointmentsList.jsx';
import AddAppointment from './AddAppointment.jsx';
import AddAppointmentForm from './AddAppointmentForm.jsx';

const PatientInfoModal = (props) => (
  <Modal
    open={props.modalOpen}
    onClose={props.handleCloseModal}
    basic
  >
    <Modal.Description>
      <Grid padded centered verticalAlign="middle" columns={3}>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h1" style={{color: 'white'}}>
              {props.patient.name}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16}>
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Address:</span>
              <span style={{color: 'white'}}> {props.patient.address}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>
                Phone Number:
              </span>
              <span style={{color: 'white'}}> {props.patient.phone}</span>
            </p>
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Age:</span>
              <span style={{color: 'white'}}> {props.patient.age}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Email:</span>
              <span style={{color: 'white'}}> {props.patient.email}</span>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="left">
            <Card.Group>
              {
                props.addAppointmentFormOpen
                  ? <AddAppointmentForm
                    patient={props.patient}
                    selectedDate={props.selectedDate}
                    selectedTime={props.selectedTime}
                    apptPurpose={props.apptPurpose}
                    handleTimeChange={props.handleTimeChange}
                    handleDateChange={props.handleDateChange}
                    handleApptPurpose={props.handleApptPurpose}
                    handleAddAppointment={props.handleAddAppointment}
                  />
                  : <AddAppointment renderAddAppointmentForm={props.renderAddAppointmentForm} />
              }
              <AppointmentsList appointments={props.appointments || []} />
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Description>
  </Modal>
)

export default PatientInfoModal;
