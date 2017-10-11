import React from 'react';
import {Grid, Card, Header} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

import PatientDetails from './PatientDetails.jsx';
import Appointments from './Appointments.jsx';
import Legend from './Legend.jsx';
import UploadDocs from './UploadDocs.jsx';

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.renderAddAppointmentForm = this.renderAddAppointmentForm.bind(this);
    this.handleUpdateAppts = this.handleUpdateAppts.bind(this);
    this.handleConfirmAppt = this.handleConfirmAppt.bind(this);
    this.handleCancelAppt = this.handleCancelAppt.bind(this);
    this.state = {
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
        if (err) {
          throw err;
        }
      });
  }

  handleUpdateAppts(appts) {
    this.setState({
      appointments: appts,
    });
  }

  renderAddAppointmentForm() {
    this.setState({
      addAppointmentFormOpen: !this.state.addAppointmentFormOpen,
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
        if (err) {
          throw err;
        }
      });
  }

  handleCancelAppt(appt) {
    axios
      .put('/appointment/cancel', appt)
      .then(response => {
        this.setState({
          appointments: response.data,
          cancelModalOpen: false,
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
      <Grid.Row>
        <Grid.Column width={16}>
          <PatientDetails patient={this.props.patient} />
          <UploadDocs patient={this.props.patient} />
          <Legend />
          <Appointments
            patient={this.props.patient}
            handleUpdateAppts={this.handleUpdateAppts}
            renderAddAppointmentForm={this.renderAddAppointmentForm}
            appointments={this.state.appointments}
            handleCancelAppt={this.handleCancelAppt}
            handleCancelModalOpen={this.handleCancelModalOpen}
            handleConfirmAppt={this.handleConfirmAppt}
            addAppointmentFormOpen={this.state.addAppointmentFormOpen}
            userType={'patient'}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Patient;
