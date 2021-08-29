import { Component } from "react";
import { Button, Container, Grid, Header, Icon, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import {Helmet} from 'react-helmet';

class About extends Component{
    render(){
        return(
            <ResponsiveContainer>
                <Helmet>
                <title>Traditional Art and NFT - Digital Art on Ethereum blockchain</title>
                <meta name="description" content="Unfold the digital - NFT and traditional art of India. Unfolding the trasure of traditaionl art along with digital art - NFT. Connect with artist and architects from all around India." />
                </Helmet>
                <Segment style={{paddingTop: 70}}>
                    <Container text style={{minHeight: 450}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column textAlign="center">
                                    <Header as='h1'>About Us</Header>
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

export default About;