import React from 'react';
import {Modal, Grid, Header, Card, Icon, Form, Button} from 'semantic-ui-react';
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
          <Card.Content style={{backgroundColor: 'rgba(92,184,92)'}}>
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

const AddAppointment = (props) => (
  <Card fluid onClick={props.renderAddAppointmentForm}>
    <Card.Content textAlign="center">
    <Icon name="plus" size="huge" color="teal" />
    </Card.Content>
  </Card>
);

const AddAppointmentForm = (props) => (
  <Card fluid>
    <Form.Input fluid />
    <Button>Add Appointment</Button>
  </Card>
);

const PatientInfoModal = (props) => (
  <Modal
    open={props.modalOpen}
    onClose={props.handleCloseModal}
    basic
  >
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
              ? <AddAppointmentForm />
              : <AddAppointment renderAddAppointmentForm={props.renderAddAppointmentForm} />
            }

            <AppointmentsList appointments={props.appointments || []} />
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Modal>
)

export default PatientInfoModal;
