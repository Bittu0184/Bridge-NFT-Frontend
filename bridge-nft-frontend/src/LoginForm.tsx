import React from 'react';
import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import Footer from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import logo from './Assets/logo.png';
import { NavLink } from 'react-bootstrap';

const LoginForm = () => (
<ResponsiveContainer>
<Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
        <Image size='massive' src={logo} /> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='black' fluid size='large'>
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

export default LoginForm