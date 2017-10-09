import React from 'react';
import PatientListEntry from './PatientListEntry.jsx';

const PatientList = (props) => (
  props.patients.map((patient, i) => {
    return (
      <PatientListEntry
        key={i}
        patient={patient}
        renderPatientInfo={props.renderPatientInfo}
      />
    )
  })
);

export default PatientList;
