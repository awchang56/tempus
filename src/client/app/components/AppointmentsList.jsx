import React from 'react';
import moment from 'moment';
import AppointmentListEntry from './AppointmentListEntry.jsx';

const renderApptColor = appt => {
  if (appt.isCancelled && moment(appt.date).diff(moment()) > 0) {
    return {borderBottom: 'medium solid red'};
  } else if (
    appt.isConfirmedByDoctor &&
    appt.isConfirmedByPatient &&
    moment(appt.date).diff(moment()) > 0
  ) {
    return {borderBottom: 'medium solid green'};
  } else if (
    ((appt.isConfirmedByDoctor || appt.isConfirmedByPatient) &&
      moment(appt.date).diff(moment()) > 0) ||
    (!appt.isConfirmedByDoctor &&
      !appt.isConfirmedByPatient &&
      moment(appt.date).diff(moment()) > 0)
  ) {
    return {borderBottom: 'medium solid orange'};
  } else {
    return {borderBottom: 'medium solid black'};
  }
};

const validateApptConfirmation = appt => {
  if (appt.isConfirmedByPatient && appt.isConfirmedByDoctor) {
    return 'star';
  } else if (!appt.isConfirmedByDoctor && !appt.isConfirmedByPatient) {
    return 'empty star';
  } else {
    return 'star half empty';
  }
};

const AppointmentsList = props =>
  props.appointments
    .sort((a, b) => moment(b.date) - moment(a.date))
    .map((appt, i) => {
      return (
        <AppointmentListEntry
          key={i}
          appt={appt}
          renderApptColor={renderApptColor}
          validateApptConfirmation={validateApptConfirmation}
          handleCancelAppt={props.handleCancelAppt}
          handleCancelModalOpen={props.handleCancelModalOpen}
          handleConfirmAppt={props.handleConfirmAppt}
          userType={props.userType}
        />
      );
    });

export default AppointmentsList;
