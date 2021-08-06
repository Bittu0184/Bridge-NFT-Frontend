import { Component } from "react";
import { Container, Dimmer, Divider, Header, Image, Loader, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import CustomCardTraditionalArt from "./CustomCardTraditionalArt";

class Artists extends Component<any,any>{
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
        const id = this.props.match.params.id;
        fetch(`${process.env.REACT_APP_API_BASE_URI + configData.apiGetAllArtByArtist + encodeURIComponent(id) }`)
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoadedMetadata: true,
                metadata: result
              });
            },(err) => {
              this.setState({
                isLoadedMetadata: true,
                error: err
              });
              console.log("Error " + err.message);
            }
        )
        fetch(`${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtistDetails + encodeURIComponent(id) }`) 
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
    render() {
        console.log("Inside s artist");
        const { error, isLoadedMetadata, isLoadedDetails } = this.state;
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
        } else if (!isLoadedMetadata || !isLoadedDetails) {
          console.log("waiting")
            return   (  
              <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer inverted active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else {
          console.log("Loaded ")
          const { artistdetails } = this.state;
          if(this.state.metadata == null){
            return(
            <ResponsiveContainer>
            <Segment>
                <Container textAlign='center' style={{minHeight: 500}}>
                    <Image src={process.env.REACT_APP_AWS_S3_BASE_URI + artistdetails.profilelocation} alt='image not available' size='medium' centered circular/>
                    <Divider/>
                    <Header as='h2'>{artistdetails.name}</Header>
                    <Container textAlign='justified'>
                    {artistdetails.about}
                    </Container>
                    <Divider/>
                    <Header as='h3'>Arts Coming Soon!!</Header>
                </Container>
            </Segment>
            <Footer/>
            </ResponsiveContainer>)
          }
          return (
              <ResponsiveContainer>
                  <Segment>
                      <Container textAlign='center' style={{minHeight: 500}}>
                          <Image src={process.env.REACT_APP_AWS_S3_BASE_URI  + artistdetails.profilelocation} alt='image not available' size='medium' centered circular/>
                          <Divider/>
                          <Header as='h2'>{artistdetails.name}</Header>
                          <Container textAlign='justified'>
                          {artistdetails.about}
                          </Container>
                          <Divider/>
                          <CustomCardTraditionalArt metadata={this.state.metadata}/>
                      </Container>
                  </Segment>
                  <Footer/>
              </ResponsiveContainer>
              
          )
        }
    }
}

export default Artists;