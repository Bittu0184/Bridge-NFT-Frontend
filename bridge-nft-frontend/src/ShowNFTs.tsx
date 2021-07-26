import React from "react";
import CustomCard from "./Card";
import ResponsiveContainer from "./ResponsiveContainer";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
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
       const { getAccessTokenSilently } = this.props.auth0;
       const accessToken = await getAccessTokenSilently({
        audience: `${configData.audience}`,
        });
        fetch(configData.apiBaseUri + configData.apiGetMetadata, {
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
      }
    
    
      render() {
        const { error, isLoaded } = this.state;
        //const { user } = this.props.auth0;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
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
        } else {
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