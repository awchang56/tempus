import React from 'react';
import {Modal, Grid, Header} from 'semantic-ui-react';

import Appointments from './Appointments.jsx';
import UploadDocs from './UploadDocs.jsx';
import Legend from './Legend.jsx';

const PatientInfoModal = props => (
  <Modal open={props.modalOpen} onClose={props.handleCloseModal} basic>
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
        <UploadDocs patient={props.patient} />
        <Legend />
        <Appointments
          patient={props.patient}
          handleUpdateAppts={props.handleUpdateAppts}
          renderAddAppointmentForm={props.renderAddAppointmentForm}
          appointments={props.appointments}
          handleCancelAppt={props.handleCancelAppt}
          handleCancelModalOpen={props.handleCancelModalOpen}
          handleConfirmAppt={props.handleConfirmAppt}
          addAppointmentFormOpen={props.addAppointmentFormOpen}
        />
      </Grid>
    </Modal.Description>
  </Modal>
);

export default PatientInfoModal;
