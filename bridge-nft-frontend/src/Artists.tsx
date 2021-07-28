import { Component } from "react";
import { Container, Divider, Header, Image, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import { Redirect } from "react-router-dom";

class Artists extends Component<any,any>{
    render() {
        console.log("Inside s artist");
        const { state } = this.props.location;
        console.log("In Cart " + state);
        if(state === undefined){
            return(
            <Redirect to="/home" />
            )
        }
        const { artistdetails } = state;
        if(artistdetails.fromAllArtist){
            return (
                <ResponsiveContainer>
                    <Segment>
                        <Container textAlign='center' style={{minHeight: 500}}>
                            <Image src={configData.awsS3BaseUri + "ReenaArt1.JPEG"} alt='image not available' size='medium' centered circular/>
                            <Divider/>
                            <Header as='h2'>{artistdetails.name}</Header>
                            <Container textAlign='justified'>
                            {artistdetails.about}
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                            </Container>
                        </Container>
                    </Segment>
                    <Footer/>
                </ResponsiveContainer>
                
            )
        }
        else{
            return(
                <Redirect to="/"/>
            )
        }
    }
}

export default Artists;