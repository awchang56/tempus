import React from 'react';
import {Grid, Card, Header} from 'semantic-ui-react';

import axios from 'axios';
import AddAppointmentForm from './AddAppointmentForm.jsx';
import AddAppointment from './AddAppointment.jsx';
import AppointmentsList from './AppointmentsList.jsx';

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPatient: {},
      appointments: [],
      addAppointmentFormOpen: false,
    };
  }

  componentDidMount() {
    axios
      .get('/appointment/' + this.props.patient.patientID)
      .then(response => {
        this.setState({
          appointments: response.data
        }, () => console.log('appts: ', this.state.appointments));
      })
      .catch(err => {
        console.log('error getting appoints for current patient: ', err);
      });
  }

  render() {
    return (
      <Grid.Row>
      <Grid.Column width={16}>
      <Grid padded centered verticalAlign="middle" columns={3}>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h1" style={{color: 'black'}}>
              {this.props.patient.name}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16}>
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Address:</span>
              <span style={{color: 'black'}}> {this.props.patient.address}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>
                Phone Number:
              </span>
              <span style={{color: 'black'}}> {this.props.patient.phone}</span>
            </p>
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Age:</span>
              <span style={{color: 'black'}}> {this.props.patient.age}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Email:</span>
              <span style={{color: 'black'}}> {this.props.patient.email}</span>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="left">
            <Card.Group>
              {
                this.props.addAppointmentFormOpen
                  ? <AddAppointmentForm
                    patient={this.props.patient}
                    selectedDate={this.props.selectedDate}
                    selectedTime={this.props.selectedTime}
                    apptPurpose={this.props.apptPurpose}
                    handleTimeChange={this.props.handleTimeChange}
                    handleDateChange={this.props.handleDateChange}
                    handleApptPurpose={this.props.handleApptPurpose}
                    handleAddAppointment={this.props.handleAddAppointment}
                  />
                  : <AddAppointment renderAddAppointmentForm={this.props.renderAddAppointmentForm} />
              }
              <AppointmentsList
                appointments={this.state.appointments}
                handleDeleteAppt={this.props.handleDeleteAppt}
                messageBoxOpen={this.props.messageBoxOpen}
                handleMessageBoxClose={this.props.handleMessageBoxClose}
                handleMessageBoxOpen={this.props.handleMessageBoxOpen}
                handleCancelMessage={this.props.handleCancelMessage}
                handleConfirmAppt={this.props.handleConfirmAppt}
              />
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Grid.Column>
      </Grid.Row>
    )
  }
}

export default Patient;