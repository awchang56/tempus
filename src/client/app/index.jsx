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
    };
  }

  componentDidMount() {
    axios
      .get('/patient')
      .then(response => {
        this.setState({
          patients: response.data,
        });
      })
      .catch(err => {
        console.log('error fetching all patients from server: ', err);
      });
  }

  renderPatientInfo(patientID) {
    console.log('patientID: ', patientID)
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
            <Form.Input fluid onChange={() => console.log('inputing text')} />
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
          <Card.Group>
            <PatientList
              patients={this.state.patients}
              renderPatientInfo={this.renderPatientInfo}
            />
          </Card.Group>
        </Grid.Row>
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'));
