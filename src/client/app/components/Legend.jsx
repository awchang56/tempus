import React from 'react';
import {Grid} from 'semantic-ui-react';

const Legend = (props) => (
  <Grid.Row>
    <Grid.Column width={16}>
      <Grid padded centered verticalAlign="middle" columns={4}>
        <Grid.Row textAlign="center" width={16}>
          <Grid.Column width={4}>
            <span style={{color: 'red', fontWeight: 'bold'}}>Appt Cancelled </span>
          </Grid.Column>
          <Grid.Column width={4}>
            <span style={{color: 'orange', fontWeight: 'bold'}}>Pending Confirmation </span>
          </Grid.Column>
          <Grid.Column width={4}>
            <span style={{color: 'green', fontWeight: 'bold'}}>Appt Confirmed </span>
          </Grid.Column>
          <Grid.Column width={4}>
            <span style={{color: 'black', fontWeight: 'bold'}}>Appt Complete </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  </Grid.Row>
);

export default Legend;