import { Component } from 'react';
import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import Footer from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import logo from './Assets/logo.png';
import { NavLink  } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

//import { fetchAPI } from './CallAPI';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleChange = input => event => {
    this.setState({ [input] : event.target.value })
  }
  async handleLogin(e){
    e.preventDefault()
    const postdata = new FormData(document.forms.namedItem("loginForm"));
    var object = {};
    postdata.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    alert("data " + json);
    await fetch("http://localhost:8282/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert(data.issuccess);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Error" +error);
    })
  }
  render() {
    return (
      <ResponsiveContainer>
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          <Image size='massive' src={logo} /> Log-in to your account
        </Header>
        <Form size='large' id="loginForm">
          <Segment stacked>
            <Form.Input fluid name='username' onChange={this.handleChange} icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              onChange={this.handleChange}
            />

            <Button onClick={this.handleLogin} color='black' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?    <br /><Button as={NavLink} to='/signup' icon><Icon name='signup' />Sign Up!</Button>
        </Message>
      </Grid.Column>
    </Grid>
    <Footer/>
  </ResponsiveContainer>
    )
  }
}

export default LoginForm