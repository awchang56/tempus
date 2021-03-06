import React from 'react';
import {Grid, Form, Input, Button} from 'semantic-ui-react';

const Login = props => (
  <Grid.Row>
    <Grid.Column width={10}>
      <Form>
        <Form.Field inline>
          <label>Username</label>
          <Input fluid onChange={props.handleUsername} />
        </Form.Field>
        <Form.Field inline>
          <label>Password</label>
          <Input fluid type="password" onChange={props.handlePassword} />
        </Form.Field>
        <Button fluid color="teal" onClick={props.handleLogin}>
          Submit
        </Button>
      </Form>
    </Grid.Column>
  </Grid.Row>
);

export default Login;
