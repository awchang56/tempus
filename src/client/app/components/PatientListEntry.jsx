import React from 'react';
import {Card, Grid} from 'semantic-ui-react';

const PatientListEntry = props => (
  <Card
    fluid
    width={15}
    color="teal"
    style={{margin: '10 30 10 30'}}
    onClick={() => props.renderPatientInfo(props.patient)}
  >
    <Card.Content>
      <Grid padded verticalAlign="middle" columns={2}>
        <Grid.Row>
          <Grid.Column width={8} textAlign="left">
            <Card.Header>
              <span style={{fontWeight: 'bold', fontSize: 22, color: 'teal'}}>
                {props.patient.name}
              </span>
              <span style={{fontStyle: 'italic', color: 'grey'}}>
                , {props.patient.age}
              </span>
            </Card.Header>
            <Card.Meta>{props.patient.email}</Card.Meta>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Card.Description>
              <p>
                <span style={{fontWeight: 'bold', color: 'teal'}}>
                  Address:
                </span>
                <span style={{color: 'black'}}> {props.patient.address}</span>
              </p>
              <p>
                <span style={{fontWeight: 'bold', color: 'teal'}}>
                  Phone Number:
                </span>
                <span style={{color: 'black'}}> {props.patient.phone}</span>
              </p>
            </Card.Description>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
);

export default PatientListEntry;
