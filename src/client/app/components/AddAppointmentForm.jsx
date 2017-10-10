import React from 'react';
import {Card, Input, Button, Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../public/rcTimePicker.css';
import moment from 'moment';

const format = 'h:mm a';

const AddAppointmentForm = (props) => (
  <Card fluid>
    <Card.Content>
      <Form>
        <Form.Group>
          <Form.Field style={{padding: 5}}>
            <label>Date: </label>
            <DatePicker
              selected={props.selectedDate}
              onChange={props.handleDateChange}
            />
          </Form.Field>
          <Form.Field style={{padding: 5}}>
            <label>Time: </label>
            <TimePicker
              use12Hours
              format={format}
              // defaultValue={null}
              value={props.selectedTime}
              showSecond={false}
              onChange={props.handleTimeChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field
          label="Purpose: "
          control="textarea"
          rows="2"
          onChange={props.handleApptPurpose}
          value={props.apptPurpose}
        />
      </Form>
    </Card.Content>
    <Button
      color="teal"
      onClick={() => props.handleAddAppointment(props.patient)}
    >
      Add Appointment
    </Button>
  </Card>
);

export default AddAppointmentForm;
