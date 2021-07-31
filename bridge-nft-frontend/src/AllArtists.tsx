import { Component } from "react";
import { Container, Dimmer, Divider, Header, Loader, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import ArtistCard from "./ArtistCard";

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
         fetch(configData.apiBaseUri + configData.apiGetAllArtist)
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
            console.log("Error " + error.message);
            return (
              <ResponsiveContainer>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Header as='h1'>Fail To Connect To server: {error.message}</Header>
              </Segment>
              <Footer/>
            </ResponsiveContainer>
            )
        } else if (!isLoaded) {
          console.log("waiting")
            return   (  
              <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else {
          console.log("Loaded ")
            return (
                <ResponsiveContainer>
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