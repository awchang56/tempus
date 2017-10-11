import React from 'react';
import {Grid, Card, Header} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

import AddAppointmentForm from './AddAppointmentForm.jsx';
import AddAppointment from './AddAppointment.jsx';
import AppointmentsList from './AppointmentsList.jsx';
import Legend from './Legend.jsx';
import UploadDocs from './UploadDocs.jsx';

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
          appointments: response.data,
        });
      })
      .catch(err => {
        console.log('error getting appoints for current patient: ', err);
      });
  }

  renderAddAppointmentForm() {
    this.setState({
      addAppointmentFormOpen: !this.state.addAppointmentFormOpen,
    });
  }

  handleDateChange(date) {
    this.setState({
      selectedDate: date,
    });
  }

  handleTimeChange(time) {
    this.setState({
      selectedTime: time,
    });
  }

  handleApptPurpose(e) {
    this.setState({
      apptPurpose: e.target.value,
    });
  }

  handleAddAppointment(patient) {
    const appt = {
      patientID: patient.patientID,
      date: moment(
        this.state.selectedDate.format('YYYY-MM-DD') +
          ' ' +
          this.state.selectedTime.format('HH-mm'),
        'YYYY-MM-DD HH-mm'
      ),
      purpose: this.state.apptPurpose,
      doctorID: 'doctor1',
      isConfirmedByPatient: true,
      isConfirmedByDoctor: false,
    };
    axios
      .post('/appointment', appt)
      .then(response => {
        this.setState({
          appointments: response.data,
          selectedDate: '',
          selectedTime: null,
          apptPurpose: '',
          addAppointmentFormOpen: false,
        });
      })
      .catch(err => {
        console.log('error saving new appointment: ', err);
      });
  }

  handleConfirmAppt(appt) {
    appt.userType = 'patient';
    axios
      .put('/appointment/confirm/', appt)
      .then(response => {
        this.setState({
          appointments: response.data,
        });
      })
      .catch(err => {
        console.log('error confirming appointment: ', err);
      });
  }

  handleDeleteAppt(appt) {
    axios
      .put('/appointment/cancel', appt)
      .then(response => {
        this.setState({
          appointments: response.data,
          messageBoxOpen: false,
        });
      })
      .catch(err => {
        console.log('error cancelling appointment', err);
      });
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Card fluid>
            <Card.Content>
              <Grid padded centered verticalAlign="middle" columns={3}>
                <Grid.Row>
                  <Grid.Column width={16} textAlign="center">
                    <Header as="h1" style={{color: 'teal'}}>
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
              </Grid>
            </Card.Content>
          </Card>
          <UploadDocs
            patient={this.props.patient}
          />
          <Legend />
          <Grid>
            <Grid.Row>
              <Grid.Column width={16} textAlign="left">
                <Card.Group>
                  {
                    this.state.addAppointmentFormOpen
                      ? <AddAppointmentForm
                        patient={this.props.patient}
                        selectedDate={this.state.selectedDate}
                        selectedTime={this.state.selectedTime}
                        apptPurpose={this.state.apptPurpose}
                        handleTimeChange={this.handleTimeChange.bind(this)}
                        handleDateChange={this.handleDateChange.bind(this)}
                        handleApptPurpose={this.handleApptPurpose.bind(this)}
                        handleAddAppointment={this.handleAddAppointment.bind(this)}
                      />
                      : <AddAppointment renderAddAppointmentForm={this.renderAddAppointmentForm.bind(this)} />
                  }
                  <AppointmentsList
                    patient={this.props.patient}
                    appointments={this.state.appointments}
                    handleDeleteAppt={this.handleDeleteAppt.bind(this)}
                    handleConfirmAppt={this.handleConfirmAppt.bind(this)}
                    userType={'patient'}
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