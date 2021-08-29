import { Component } from "react";
import { Button, Container, Grid, Header, Icon, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import {Helmet} from 'react-helmet';

class Contact extends Component{
    render(){
        return(
            <ResponsiveContainer>
                <Helmet>
                <title>Contact Unfold Innovates</title>
                <meta name="description" content="Connect with local artists, architects and know story behind their art." />
                </Helmet>
                <Segment style={{paddingTop: 70}}>
                    <Container text style={{minHeight: 450}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column textAlign="center">
                                    <Header as='h1'>Contact Us</Header>
                                    <br/>
                                    <br/>
                                    <Header as='h4'>Get Started Today</Header>
                                    <p>Send us a message or call us to ask us about putting your art on sale.<br />
                                    You can even put up a digital art and get a traditional art in return.
                                     </p>
                                     <br/>
                                     <Button color='instagram' size="large" as='a' href="https://wa.me/917389695059"><Icon name='whatsapp' /> Message Us On Whatsapp!!</Button>
                                     <br/>
                                    <Header as='h4'>UNFOLD INNOVATES</Header>
                                    <p>contact@unfoldinnovates.com</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        )
    }
}

export default Contact;