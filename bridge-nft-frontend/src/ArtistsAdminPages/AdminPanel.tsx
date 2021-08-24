import { Component } from "react";
import { Container, Dimmer, Grid, Loader, Message, Segment } from "semantic-ui-react";
import Footer from "../Footer";
import ResponsiveContainer from "../ResponsiveContainer";
import { withAuth0 } from '@auth0/auth0-react';
import AddProduct from "./AddProduct";
import MenuTab from "./MenuTab";
import ArtistProfile from "./ArtistProfile";
import configData from '../Config.json';

class AdminPanel extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            isSubmitted: false,
            isWaiting: true,
            activeItem: 'General',
            error: null,
            isAccessApproved: false
        }
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
            await fetch(`${process.env.REACT_APP_API_BASE_URI + configData.apiCheckAccess}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
              })
              .then(res => res.json())
              .then((result) => {
                    this.setState({
                        isWaiting: false,
                        message: result.message,
                        isAccessApproved: true
                      });
                }, (err) => {
                  this.setState({
                    isWaiting: false,
                    error: err,
                    isAccessApproved: false
                  });
                  console.log("Error: " + err.message);
                }
              )
          }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { isWaiting, activeItem, error, isAccessApproved } = this.state;
        if(isWaiting){
            return(
                <ResponsiveContainer>
                <Segment style={{minHeight: 500}}>
                    <Dimmer inverted active>
                        <Loader size='massive'/>
                    </Dimmer>
                </Segment>
                <Footer/>
                </ResponsiveContainer>
            )
        }else if(!isAccessApproved){
            return(
                <ResponsiveContainer>
                    <Container style={{minHeight: 500}}>
                    <Message>
                        <Message.Header>You are not added as an artist!!</Message.Header>
                        <p>
                        If you are an artist and want to join this platform, please fill up the form and we will add you after verification in 1 - 2 days.
                        To fill form <a href="https://forms.gle/T334EwYDoe4kP2As5">Click Here!</a>
                        </p>
                    </Message>
                    </Container>
                    
                    <Footer/>
                </ResponsiveContainer>
            )
        }
        else if(error){
            return(
                <ResponsiveContainer>
                    <Container style={{minHeight: 500}}>
                    <Message>
                        <Message.Header>We are facing an issue. Please try again later.</Message.Header>
                    </Message>
                    <Footer/>
                    </Container>
                </ResponsiveContainer>
            )
        }
        else if(activeItem === 'Products'){
        return(
            <ResponsiveContainer>
                <Container>
            <Grid doubling stackable>
                <Grid.Row >
                <Grid.Column width={3}>
                    <MenuTab activeItem={this.state.activeItem} handleItemClick={this.handleItemClick}/>
                 </Grid.Column>
                <Grid.Column width={10}>
                    <AddProduct/>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
            <Footer/>
            </ResponsiveContainer>
        )}else if(activeItem === 'General'){
            return(
                <ResponsiveContainer>
                    <Container>
                <Grid doubling stackable>
                    <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuTab activeItem={this.state.activeItem} handleItemClick={this.handleItemClick}/>
                     </Grid.Column>
                    <Grid.Column width={12}>
                        <ArtistProfile/>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                </Container>
                <Footer/>
                </ResponsiveContainer>
            )} else{
            return (
            <ResponsiveContainer>
                <Container>
            <Grid doubling stackable>
                <Grid.Column width={3}>
                    <MenuTab activeItem={activeItem} handleItemClick={this.handleItemClick}/>
                 </Grid.Column>
                <Grid.Column width={10}>
                    <h1>Coming Soon!!</h1>
                </Grid.Column>
            </Grid>
            </Container>
            <Footer/>
            </ResponsiveContainer>
            )
        }
    }
}

export default withAuth0(AdminPanel);