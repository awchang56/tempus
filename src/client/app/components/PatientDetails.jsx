import React from 'react';
import {Grid, Card, Header} from 'semantic-ui-react';

const PatientDetails = props => (
  <Card fluid>
    <Card.Content>
      <Grid padded centered verticalAlign="middle" columns={3}>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as="h1" style={{color: 'teal'}}>
              {props.patient.name}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16}>
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Address:</span>
              <span style={{color: 'black'}}>
                {' '}
                {props.patient.address}
              </span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>
                Phone Number:
              </span>
              <span style={{color: 'black'}}> {props.patient.phone}</span>
            </p>
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={6} textAlign="left">
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Age:</span>
              <span style={{color: 'black'}}> {props.patient.age}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold', color: 'teal'}}>Email:</span>
              <span style={{color: 'black'}}> {props.patient.email}</span>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
);

export default PatientDetails;
