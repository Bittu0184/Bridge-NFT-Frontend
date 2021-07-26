import { Component } from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

class Footer extends Component{
    render(){
        return (
            <Segment inverted vertical style={{ padding: '0em 0em' }}>
                <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as={NavLink} to="/contact">Contact Us</List.Item>
                            <List.Item as={NavLink} to="/about">About us</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                        <List.Item as={NavLink} to="/exploretraditionalart">Buy Loacl Art</List.Item>
                        <List.Item as={NavLink} to="/artists">Upload Art</List.Item>
                        <List.Item as={NavLink} to="/drop">Mint NFT</List.Item>
                        <List.Item as={NavLink} to="/drop">Sell NFT</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4' inverted>

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