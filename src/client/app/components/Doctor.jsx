import React from 'react';
import {Grid, Form, Card} from 'semantic-ui-react';
import axios from 'axios';

import PatientList from './PatientList.jsx';
import PatientInfoModal from './PatientInfoModal.jsx';
import CancelMessageModal from './CancelMessageModal.jsx';

class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateAppts = this.handleUpdateAppts.bind(this);
    this.handleCancelAppt = this.handleCancelAppt.bind(this);
    this.handleCancelModalClose = this.handleCancelModalClose.bind(this);
    this.handleCancelModalMessage = this.handleCancelModalMessage.bind(this);
    this.renderPatientInfo = this.renderPatientInfo.bind(this);
    this.handleSearchPatient = this.handleSearchPatient.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderAddAppointmentForm = this.renderAddAppointmentForm.bind(this);
    this.handleCancelModalOpen = this.handleCancelModalOpen.bind(this);
    this.handleConfirmAppt = this.handleConfirmAppt.bind(this);
    this.handleCancelAppt = this.handleCancelAppt.bind(this);
    this.state = {
      patients: [],
      allPatients: [],
      modalOpen: false,
      addAppointmentFormOpen: false,
      cancelModalOpen: false,
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
        if (err) {
          throw err;
        }
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
        if (err) {
          throw err;
        }
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
      cancelModalOpen: false,
    });
  }

  renderAddAppointmentForm() {
    this.setState({
      addAppointmentFormOpen: !this.state.addAppointmentFormOpen,
    });
  }

  handleUpdateAppts(appts) {
    this.setState({
      appointments: appts,
    });
  }

  handleCancelAppt() {
    let cancelledAppt;
    if (arguments.length === 1) {
      cancelledAppt = arguments[0];
    } else {
      cancelledAppt = {
        ...this.state.cancelledAppt,
        message: this.state.cancelMessage,
      };
    }

    axios
      .put('/appointment/cancel', cancelledAppt)
      .then(response => {
        this.setState({
          appointments: response.data,
          cancelModalOpen: false,
          modalOpen: true,
        });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  handleCancelModalMessage(e) {
    this.setState({
      cancelMessage: e.target.value,
    });
  }

  handleCancelModalOpen(appt) {
    this.setState({
      cancelModalOpen: true,
      cancelledAppt: appt,
      modalOpen: false,
    });
  }

  handleCancelModalClose() {
    this.setState({
      cancelModalOpen: false,
      modalOpen: true,
    });
  }

  handleConfirmAppt(appt) {
    appt.userType = 'doctor';
    axios
      .put('/appointment/confirm', appt)
      .then(response => {
        this.setState({
          appointments: response.data,
        });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Input
              style={{margin: '10 30 10 30'}}
              fluid
              placeholder="Search for a patient here..."
              onChange={this.handleSearchPatient}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card.Group>
              <PatientList
                patients={this.state.patients}
                renderPatientInfo={this.renderPatientInfo}
              />
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <PatientInfoModal
            modalOpen={this.state.modalOpen}
            patient={this.state.selectedPatient || {}}
            handleCloseModal={this.handleCloseModal}
            appointments={this.state.appointments}
            renderAddAppointmentForm={this.renderAddAppointmentForm}
            addAppointmentFormOpen={this.state.addAppointmentFormOpen}
            handleCancelModalOpen={this.handleCancelModalOpen}
            handleConfirmAppt={this.handleConfirmAppt}
            handleCancelAppt={this.handleCancelAppt}
            handleUpdateAppts={this.handleUpdateAppts}
          />
        </Grid.Row>
        <Grid.Row>
          <CancelMessageModal
            cancelModalOpen={this.state.cancelModalOpen}
            handleCancelAppt={this.handleCancelAppt}
            handleCancelModalClose={this.handleCancelModalClose}
            handleCancelModalMessage={this.handleCancelModalMessage}
          />
        </Grid.Row>
      </div>
    );
  }
}

export default Doctor;
