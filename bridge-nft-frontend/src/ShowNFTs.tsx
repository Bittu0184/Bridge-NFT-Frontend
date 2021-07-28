import React from "react";
import CustomCard from "./Card";
import ResponsiveContainer from "./ResponsiveContainer";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import './ShowNFTs.css';
import { withAuth0 } from '@auth0/auth0-react';
import configData from './Config.json';

class ShowNFTs extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
      }

      async componentDidMount() {
       const { loginWithRedirect,getAccessTokenSilently, isAuthenticated } = this.props.auth0;
       if(isAuthenticated){
        const accessToken = await getAccessTokenSilently({
          audience: `${configData.audience}`,
          });
          console.log("Acces " + accessToken);
          fetch(configData.apiBaseUri + configData.apiGetAllMetadata, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            }).then(res => res.json())
            .then( (result) => {
                this.setState({
                  isLoaded: true,
                  metadata: result.metadata
                });
                console.log(this.state.metadata);
              },(error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        }else{
          await loginWithRedirect();
        }
       
      }
    
    
      render() {
        const { error, isLoaded } = this.state;
       if (!isLoaded) {
        console.log("Loading...");
            return  (  
              <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else if(error){
          console.log("In error "+ error.message);
          return (
            <ResponsiveContainer>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Container textAlign='center'>
                  <Header as='h1'>OOPS Something went wrong!</Header>
                </Container>
              </Segment>
              <Footer/>
            </ResponsiveContainer>
          )
        }else {
          console.log("Loaded");
          return (
            <ResponsiveContainer>
              <Container className="customContainer">
              <CustomCard metadata={this.state.metadata}/>
              </Container>
              <Footer />
            </ResponsiveContainer>
          );
        }
      }
}

export default withAuth0(ShowNFTs);