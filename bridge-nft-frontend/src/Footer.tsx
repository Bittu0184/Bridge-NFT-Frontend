import { Component } from "react";
import { Container, Divider, Grid, Header, List, Segment } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

class Footer extends Component{
    render(){
        return (
            <Segment vertical style={{ padding: '0em 0em', marginTop: 10 }}>
                <Divider/>
                <Container>
                <Grid divided stackable>
                    <Grid.Row>
                    <Grid.Column width={3}>
                        <Header as='h4' content='About' />
                        <List link >
                            <List.Item as={NavLink} to="/contact">Contact Us</List.Item>
                            <List.Item as={NavLink} to="/about">About us</List.Item>
                            <List.Item as={NavLink} to="/tnc">Terms & Condition</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header as='h4' content='Services' />
                        <List link>
                        <List.Item as={NavLink} to="/exploretraditionalart">Buy Loacl Art</List.Item>
                        <List.Item as={NavLink} to="/artists">Upload Art</List.Item>
                        <List.Item as={NavLink} to="/drop">Mint NFT</List.Item>
                        <List.Item as={NavLink} to="/drop">Sell NFT</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4'>

                        </Header>
                        <p>
                        Copyright © 2021 Unfold Innovates - All Rights Reserved.
                        </p>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>
            </Segment>
        )
    }
}

export default Footer;