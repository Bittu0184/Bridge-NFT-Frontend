import  { Component } from 'react';
import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import Footer from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import logo from './Assets/logo.png';
import { NavLink } from 'react-router-dom';
import { fetchAPI } from './CallAPI';

class SignupForm extends Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e){
    e.preventDefault();
    const postdata = new FormData(document.forms.namedItem("signupForm"));
    var object = {};
    postdata.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    alert("data " + json)
   // await fetchAPI("http://localhost:8282/signup",json).then((data) => alert(data))
    await fetch("http://localhost:8282/signup", {
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
    })
  }

  handleChange = input => event => {
    this.setState({ [input] : event.target.value })
  }

  render() {
    return (
      <ResponsiveContainer>
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
              <Image size='massive' src={logo} /> Sign Up
            </Header>
            <Form size='large' id="signupForm">
              <Segment stacked>
                <Form.Input fluid icon='user' name='username' onChange={this.handleChange('username')} iconPosition='left' placeholder='Username' />
                <Form.Input fluid icon='user' name='email'  onChange={this.handleChange('email')} iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                  fluid
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange('password')}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  name='confirmpassword'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  onChange={this.handleChange('confirmpassword')}
                />
      
                <Button type='submit' color='black' fluid size='large' onClick={this.handleSubmit}>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already Registered?<br /><Button as={NavLink} to='/login' icon><Icon name='sign in' />Login</Button>
            </Message>
          </Grid.Column>
        </Grid>
        <Footer/>
      </ResponsiveContainer>
    )
  }
} 

export default SignupForm