import React from 'react';
import {render} from 'react-dom';
import {Grid, Header, Form, Button, Icon, Card} from 'semantic-ui-react';
import axios from 'axios';

import PatientList from './components/PatientList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      allPatients: [],
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

  renderPatientInfo(patientID) {
    console.log('patientID: ', patientID);
  }

  handleSearchPatient(e) {
    const filteredPatients = this.state.allPatients.filter(patient => {
      return patient.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({
      patients: filteredPatients,
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
          <Grid.Column width={14}>
            <Form.Input fluid onChange={this.handleSearchPatient.bind(this)} />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button onClick={() => console.log('button pressed')}>
              <Icon name="search" />
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h3">Patient Information</Header>
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
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'));
