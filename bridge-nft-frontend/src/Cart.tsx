import { Component } from "react";
import { Button, Container, Dimmer, Header, Icon, Loader, Segment } from "semantic-ui-react";
import CustomFeedCart from "./CustomFeedCart";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import { withAuth0 } from '@auth0/auth0-react';
import { NavLink } from "react-router-dom";
import configData from './Config.json';
class Cart extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: [],
            totalAmt: 0
        };
      }

      async componentDidMount() {
        const { loginWithRedirect, getAccessTokenSilently, isAuthenticated } = this.props.auth0;
        if(isAuthenticated){
            let accessToken;
            const{ user } = this.props.auth0;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `${configData.audience}`,
                });
            }catch(err){
              console.log("Error in fetching acess token " + err.message);
              this.setState({isLoaded: false,error: err});
            }
            console.log("Userid" + user.sub);
            await fetch(`${configData.apiBaseUri}${configData.apiGetCartItems}${encodeURIComponent(user.sub)}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              })
              .then(res => res.json())
              .then( (result) => {
                  if(result == null){
                    this.setState({
                        isLoaded: false,
                        metadata: null,
                        error: "Empty Cart",
                        totalAmt: 0
                      });
                      return
                  }
                console.log("Cart Items " + result);
                let total = 0;
                result.map((data) => {
                    total = total + data.price;
                    return null;
                })
                console.log("Total " + total);
                  this.setState({
                    isLoaded: true,
                    metadata: result,
                    totalAmt: total
                  });
                },(error) => {
                  this.setState({
                    isLoaded: true,
                    error: error,
                    totalAmt: 0
                  });
                  console.log("Error " + error);
                }
              )
        }else {
            await loginWithRedirect();
        }
        
      }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            console.log("Error " + error);
            if(error === "Empty Cart"){
              const{ user } = this.props.auth0;
                return(
                  <ResponsiveContainer>
                    <Segment style={{minHeight: 500, marginTop: 50}}>
                      <Container textAlign='center' >
                        <Header as='h1'>OOPS!! Seems Like you have an Empty Cart! Mr.{user.name}</Header>
                        <Button icon as={NavLink} to="/exploretraditionalart"><Icon name='cart'/>Shop Now!!</Button>
                      </Container>
                    </Segment>
                    <Footer/>
                  </ResponsiveContainer>
                )
            }
            return (
              <ResponsiveContainer>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Container textAlign='center'>
                  <Header as='h1'>OOPS Something Went Wrong.</Header>
                </Container>
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
                  <CustomFeedCart metadata={this.state.metadata} totalAmt={this.state.totalAmt}/>
                  </Container>
                  <Button size='large' primary><Icon name='cart'/>Proceed To Checkout</Button>
                <Footer />
              </ResponsiveContainer>
            );
        }
    }
}

export default withAuth0(Cart);