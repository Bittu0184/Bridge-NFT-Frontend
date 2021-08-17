import { Component } from "react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';
import { withAuth0 } from '@auth0/auth0-react';
import { Container } from "semantic-ui-react";


class Admin extends Component<any,any>{
    constructor(props){
        super(props)
        this.state = {
            isAdded: false,
            Message:'No update'
        }
  //      this.addProduct = this.addProduct.bind(this);
    }
/*
    async addProduct(prodid){
        const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } = this.props.auth0;
        if(!isAuthenticated){
          await loginWithRedirect();
        }else{
            let accessToken;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `${process.env.REACT_APP_AUTH_AUDIENCE_ADMIN}`,
                });
            }catch(err){
              console.log("Error in fetching acess token " + err.message);
            }
            console.log("USer id: "+ user.sub + " productid: " + prodid)
             fetch(`${process.env.REACT_APP_API_BASE_URI}${configData.apiAddToCart}${encodeURIComponent(user.sub)}/${encodeURIComponent(prodid)}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                }
                })
              .then(res => res.json())
              .then( (result) => {
                console.log("Response For Add to cart API " + result.Message);
                  this.setState({
                    isAdded: true,
                  });
                },(error) => {
                  this.setState({
                    isAdded: false
                  });
                  console.log("Error in adding to cart " + error);
                }
              )
        }
    }
*/
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
             // console.log("USer id: "+ user.sub )
          await fetch(`${process.env.REACT_APP_API_BASE_URI}${configData.apiAddProduct}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
            })
          .then(res => res.json())
          .then( (result) => {
            console.log("Response For Add product API " + result.message);
              this.setState({
                isAdded: true,
                Message: result.message
              });
            },(error) => {
              this.setState({
                isAdded: true
              });
              console.log("Error in adding product " + error);
            }
          )
        }
    }

    render() {
        console.log("In Admin ");
        const { isAdded } = this.state;
        if(!isAdded){
            return(
            <ResponsiveContainer>
            <p>Not Added Yet</p>
            <Footer />
            </ResponsiveContainer>)
        }else{
        return (
            <ResponsiveContainer>
                <Container><p>"MESAGE : " {this.state.Message}</p></Container>
                <Footer />
            </ResponsiveContainer>
        )
        }
    }
}

export default withAuth0(Admin);