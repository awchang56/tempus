import React from 'react';
import {render} from 'react-dom';
import {Grid, Header, Form, Button, Icon, Card} from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';

import PatientList from './components/PatientList.jsx';
import PatientInfoModal from './components/PatientInfoModal.jsx';
import CancelMessageModal from './components/CancelMessageModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      allPatients: [],
      modalOpen: false,
      addAppointmentFormOpen: false,
      messageBoxOpen: false,
    };
  }

  componentDidMount() {
    axios
      .get('/patient')
      .then(response => {
        this.setState({
          allPatients: response.data,
          patients: response.data,
        });
      })
      .catch(err => {
        console.log('error fetching all patients from server: ', err);
      });
  }

  renderPatientInfo(patient) {
    axios
      .get('/appointment/' + patient.patientID)
      .then(response => {
        this.setState({
          selectedPatient: patient,
          modalOpen: !this.state.modalOpen,
          appointments: response.data,
        });
      })
      .catch(err => {
        console.log('error retrieving appts: ', err);
      });
  }

  handleSearchPatient(e) {
    const filteredPatients = this.state.allPatients.filter(patient => {
      return patient.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({
      patients: filteredPatients,
    });
  }

  handleCloseModal() {
    this.setState({
      modalOpen: false,
      addAppointmentFormOpen: false,
      messageBoxOpen: false,
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
    let appt = {
      patientID: patient.patientID,
      date: moment(
        this.state.selectedDate.format('YYYY-MM-DD') +
          ' ' +
          this.state.selectedTime.format('HH-mm'),
        'YYYY-MM-DD HH-mm'
      ),
      purpose: this.state.apptPurpose,
      doctorID: 'doctor1',
      isConfirmedByPatient: false,
      isConfirmedByDoctor: true,
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

  handleDeleteAppt() {
    const cancelledAppt = {
      ...this.state.cancelledAppt,
      message: this.state.cancelMessage,
    };

    axios
      .put('/appointment', cancelledAppt)
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

  handleCancelMessage(e) {
    this.setState({
      cancelMessage: e.target.value,
    });
  }

  handleMessageBoxOpen(appt) {
    this.setState({
      messageBoxOpen: true,
      cancelledAppt: appt,
    });
  }

  handleMessageBoxClose() {
    this.setState({
      messageBoxOpen: false,
    });
  }

  render() {
    return (
      <Grid centered padded verticalAlign="middle" columns={3}>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h1">TEMPUS</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h3">Patient Information</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Input
              style={{margin: '10 30 10 30'}}
              fluid
              placeholder="Enter a patient name here..."
              onChange={this.handleSearchPatient.bind(this)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card.Group>
              <PatientList
                patients={this.state.patients}
                renderPatientInfo={this.renderPatientInfo.bind(this)}
              />
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <PatientInfoModal
            modalOpen={this.state.modalOpen}
            patient={this.state.selectedPatient || {}}
            handleCloseModal={this.handleCloseModal.bind(this)}
            appointments={this.state.appointments}
            renderAddAppointmentForm={this.renderAddAppointmentForm.bind(this)}
            addAppointmentFormOpen={this.state.addAppointmentFormOpen}
            selectedDate={this.state.selectedDate}
            selectedTime={this.state.selectedTime}
            apptPurpose={this.state.apptPurpose}
            handleDateChange={this.handleDateChange.bind(this)}
            handleTimeChange={this.handleTimeChange.bind(this)}
            handleApptPurpose={this.handleApptPurpose.bind(this)}
            handleAddAppointment={this.handleAddAppointment.bind(this)}
            handleMessageBoxOpen={this.handleMessageBoxOpen.bind(this)}
          />
        </Grid.Row>
        <Grid.Row>
          <CancelMessageModal
            handleDeleteAppt={this.handleDeleteAppt.bind(this)}
            messageBoxOpen={this.state.messageBoxOpen}
            handleMessageBoxClose={this.handleMessageBoxClose.bind(this)}
            handleCancelMessage={this.handleCancelMessage.bind(this)}
          />
        </Grid.Row>
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'));
