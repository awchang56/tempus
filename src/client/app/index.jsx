import React from 'react';
import {render} from 'react-dom';
import {Grid, Header, Form, Input, Button} from 'semantic-ui-react';
import axios from 'axios';
import hasher from 'password-hash-and-salt';


import Login from './components/Login.jsx';

import Doctor from './components/Doctor.jsx';
import Patient from './components/Patient.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userType: '',
      validLogin: '',
      patient: {},
    };
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin() {
    let credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post('/login', credentials)
      .then(response => {
        if (response.data === 'invalid') {
          console.log('invalid username/password combo');
          this.setState({
            validLogin: false,
          });
        } else {
          if (response.data.userType === 'patient') {
            this.setState({
              userType: response.data.userType,
              validLogin: true,
              patient: response.data.patient,
            });
          } else {
            this.setState({
              userType: response.data,
              validLogin: true,
            });
          }
        }
      })
      .catch(err => {
        console.log('error authenticating credentials');
      });
  }

  validateLogin() {
    if (this.state.validLogin === '') {
      return null;
    } else if (!this.state.validLogin) {
      return (
        <Header as="h4" style={{color: 'red'}}>
          Invalid username/password combo
        </Header>
      );
    } else {
      return null;
    }
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
          <Grid.Column width={16} textAlign="center">
            <Header as="h3">
              {
                this.state.validLogin ? 'Patient Information' : 'Login'
              }
            </Header>
            {
              (JSON.stringify(this.state.validLogin) === 'false') ? (
                <Header as="h4" style={{color: 'red'}}>
                  Invalid username/password combo
                </Header>
                ) : null
            }
          </Grid.Column>
        </Grid.Row>
        {
          this.state.userType === 'doctor'
            ? <Doctor />
            : this.state.userType === 'patient'
              ? <Patient patient={this.state.patient} />
              : <Login
                handleLogin={this.handleLogin.bind(this)}
                handlePassword={this.handlePassword.bind(this)}
                handleUsername={this.handleUsername.bind(this)}
              />
        }
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'));
