import {Component } from 'react'
import {  Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import CustomCardTraditionalArt from './CustomCardTraditionalArt'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import { withAuth0 } from '@auth0/auth0-react';
import './ShowNFTs.css'

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
        const { getAccessTokenSilently } = this.props.auth0;
        const domain = "unfoldinnovates.com";
        const accessToken = await getAccessTokenSilently({
         audience: `https://${domain}`,
         scope: "read:current_user",
         });
         console.log("Access Token " + accessToken);
         fetch("http://localhost:8282/get_all_metadata", {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
           })
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoaded: true,
                metadata: result.metadata
              });
              console.log(this.state.metadata);
            },(error) => {
              this.setState({
                isLoaded: false,
                error
              });
            }
          )
      }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return (
            <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <div> OOPS!! Error: {error.message}</div>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else if (!isLoaded) {
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
            return (
              <ResponsiveContainer>
                  <Container className="customContainer">
                  <CustomCardTraditionalArt metadata={this.state.metadata}/>
                  </Container>
                <Footer />
              </ResponsiveContainer>
            );
        }
    }
}

export default withAuth0(ExploreTraditionalArt)