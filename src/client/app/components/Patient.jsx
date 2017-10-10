import React from 'react';
import {Grid} from 'semantic-ui-react';

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid>
        Hello Patient
      </Grid>
    )
  }
}

export default Patient;