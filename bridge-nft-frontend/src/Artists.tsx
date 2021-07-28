import { Component } from "react";
import { Container, Dimmer, Divider, Header, Image, Loader, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import { Redirect } from "react-router-dom";
import CustomCardTraditionalArt from "./CustomCardTraditionalArt";

class Artists extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
    }

    async componentDidMount(){
        const state = this.props.location;
        console.log("Did mount artist " + state)
        if(state === undefined){
            return
        }
        const artistdetails = this.props.location.state.artistdetails;
        console.log("Supplierr id " + artistdetails.supplierid)
        fetch(`${configData.apiBaseUri + configData.apiGetAllArtByArtist + encodeURIComponent(artistdetails.supplierid) }`)
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
        console.log("Inside s artist");
        const { state } = this.props.location;
        console.log("In Cart " + state);
        if(state === undefined){
            return(
            <Redirect to="/home" />
            )
        }
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
          const { artistdetails } = state;
          if(artistdetails.fromAllArtist){
              return (
                  <ResponsiveContainer>
                      <Segment>
                          <Container textAlign='center' style={{minHeight: 500}}>
                              <Image src={configData.awsS3BaseUri + artistdetails.profilelocation} alt='image not available' size='medium' centered circular/>
                              <Divider/>
                              <Header as='h2'>{artistdetails.name}</Header>
                              <Container textAlign='justified'>
                              {artistdetails.about}
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                              </Container>
                              <Divider/>
                              <CustomCardTraditionalArt metadata={this.state.metadata}/>
                          </Container>
                      </Segment>
                      <Footer/>
                  </ResponsiveContainer>
                  
              )
          }else{
            return(
                <Redirect to="/"/>
            )
        }
        }
    }
}

export default Artists;