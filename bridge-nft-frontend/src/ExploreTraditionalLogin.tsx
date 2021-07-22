import {Component } from 'react'
import {  Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import CustomCardTraditionalArt from './CustomCardTraditionalArt'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import { withAuth0 } from '@auth0/auth0-react';
import './ShowNFTs.css'
import { Redirect } from 'react-router-dom'

class ExploreTraditionalArt extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
      }

      async componentDidMount() {
        const { loginWithRedirect, getAccessTokenSilently } = this.props.auth0;
        const domain = "unfoldinnovates.com";
        let accessToken;
        try{
          accessToken = await getAccessTokenSilently({
            audience: `https://${domain}`,
            scope: "read:current_user",
            });
        }catch(err){
          console.log("Error in fetching acess token " + err.message);
          await loginWithRedirect();
          this.setState({isLoaded: true,error: err});
          return
        }
         //console.log("Access Token " + accessToken);
         fetch("http://localhost:8282/get_all_art", {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
           })
          .then(res => res.json())
          .then( (result) => {
            console.log("Metadata " + result.productname);
              this.setState({
                isLoaded: true,
                metadata: result
              });
            },(error) => {
              this.setState({
                isLoaded: true,
                error: error
              });
              console.log("Error " + error);
            }
          )
      }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            console.log("Error " + error);
            return (
              <ResponsiveContainer>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Dimmer active>
                  <Loader size='massive'/>
                </Dimmer>
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
              <ResponsiveContainer >
                  <Container style={{minHeight: 500}} className="customContainer">
                  <CustomCardTraditionalArt metadata={this.state.metadata}/>
                  </Container>
                <Footer />
              </ResponsiveContainer>
            );
        }
    }
}

export default withAuth0(ExploreTraditionalArt)