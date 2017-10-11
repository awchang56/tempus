import React from 'react';
import {Card, Button, Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../public/rcTimePicker.css';
import axios from 'axios';
import moment from 'moment';

const format = 'h:mm a';

class AddAppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleApptPurpose = this.handleApptPurpose.bind(this);
    this.handleAddAppointment = this.handleAddAppointment.bind(this);
    this.state = {
      selectedDate: '',
      selectedTime: null,
      apptPurpose: '',
    };
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
      isConfirmedByPatient: this.props.userType === 'patient' ? true : false,
      isConfirmedByDoctor: this.props.userType === 'patient' ? false : true,
    };
    axios
      .post('/appointment', appt)
      .then(response => {
        this.setState({
          selectedDate: '',
          selectedTime: null,
          apptPurpose: '',
        });
        this.props.handleUpdateAppts(response.data);
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Group>
              <Form.Field style={{padding: 5}}>
                <label>Date: </label>
                <DatePicker
                  selected={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
              </Form.Field>
              <Form.Field style={{padding: 5}}>
                <label>Time: </label>
                <TimePicker
                  use12Hours
                  format={format}
                  value={this.state.selectedTime}
                  showSecond={false}
                  onChange={this.handleTimeChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field
              label="Purpose: "
              control="textarea"
              rows="2"
              value={this.state.apptPurpose}
              onChange={this.handleApptPurpose}
            />
          </Form>
        </Card.Content>
        <Button
          color="teal"
          onClick={() => this.handleAddAppointment(this.props.patient)}
        >
          Add Appointment
        </Button>
      </Card>
    );
  }
}

export default AddAppointmentForm;
