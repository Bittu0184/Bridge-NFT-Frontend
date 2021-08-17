import { Component } from "react";
import { Button, Container, Dimmer, Divider, Header, Image, Loader, Segment } from "semantic-ui-react";
import configData from '../Config.json';
import { withAuth0 } from '@auth0/auth0-react';


class ArtistProfile extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoadedMetadata: false,
            isLoadedDetails: false,
            metadata: [],
            artistdetails: []
        };
    }

    async componentDidMount(){
            const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = this.props.auth0;
            if(!isAuthenticated){
              await loginWithRedirect();
            }else{
                let accessToken;
                try{
                  accessToken = await getAccessTokenSilently();
                }catch(err){
                  console.log("Error in fetching acess token " + err.message);
                }
                console.log("Access token : " + accessToken)
            await fetch(`${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtist}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
              })
              .then(res => res.json())
              .then((result) => {
                this.setState({
                  isLoadedDetails: true,
                  artistdetails: result
                });
                }, (err) => {
                  this.setState({
                    isLoadedDetails: true,
                    error: err
                  });
                  console.log("Error: " + err.message);
                }
              )
          }
    }
    render() {
        console.log("Inside s artist");
        const { error, isLoadedDetails } = this.state;
        if (error) {
            console.log("Error " + error.message);
            return (
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Header as='h1'>Fail To Connect To server: {error.message}</Header>
              </Segment>
            )
        } else if (!isLoadedDetails) {
          console.log("waiting")
            return   (  
              
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer inverted active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
            )
        } else {
          console.log("Loaded ")
          const { artistdetails } = this.state;
          if(this.state.metadata == null){
            return(
                <Container textAlign='center' style={{minHeight: 500}}>
                    <Image src={process.env.REACT_APP_AWS_S3_BASE_URI + artistdetails.profilelocation} alt='image not available' size='medium' centered circular/>
                    <Divider/>
                    <Header as='h2'>{artistdetails.name}</Header>
                    <Container textAlign='justified'>
                    {artistdetails.about}
                    </Container>
                    <Divider/>
                    <Button>Add Products/Art.</Button>
                </Container>
            )
          }
          return (
                      <Container textAlign='center' style={{minHeight: 500}}>
                          <Image width="350" height="350" src={process.env.REACT_APP_AWS_S3_BASE_URI  + artistdetails.profilelocation} alt='image not available' centered circular/>
                          <Divider/>
                          <Header as='h2'>{artistdetails.name}</Header>
                          <Container textAlign='justified'>
                          {artistdetails.about}
                          </Container>
                          <Divider/>
                      </Container>
              
          )
        }
    }
}

export default withAuth0(ArtistProfile);