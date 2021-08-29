import { Component } from "react";
import { Container, Dimmer, Divider, Header, Loader, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import ArtistCard from "./ArtistCard";
import {Helmet} from 'react-helmet';

class AllArtists extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
      }

      async componentDidMount() {
         fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetAllArtist)
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoaded: true,
                metadata: result
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          )
        }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return (
              <ResponsiveContainer>
                <Helmet>
                <title>Indian Artists</title>
                <meta name="description" content="Buy products from artist you connect most with, artist with their products and story behind their art." />
                </Helmet>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Header as='h1'>Fail To Connect To server: {error.message}</Header>
              </Segment>
              <Footer/>
            </ResponsiveContainer>
            )
        } else if (!isLoaded) {
            return   (  
              <ResponsiveContainer>
                <Helmet>
                <title>Indian Artists</title>
                <meta name="description" content="Buy products from artist you connect most with, artist with their products and story behind their art." />
                </Helmet>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer inverted active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else {
            return (
                <ResponsiveContainer>
                  <Helmet>
                <title>Indian Artists</title>
                <meta name="description" content="Buy products from artist you connect most with, artist with their products and story behind their art." />
                </Helmet>
                <Segment>
                    <Container textAlign='center' >
                        <Header cenetered as='h1'>!!Our Beloved Artist!!</Header>
                        <Divider/>
                    </Container>
                    <Container  textAlign='center'>
                        <ArtistCard metadata={this.state.metadata}/>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
            );
        }
    }
}

export default AllArtists;