import { Component } from "react";
import { Image, Header, Icon, Button, Divider, Card } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import { NavLink, Redirect } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import configData from './Config.json';
import './BuyNowPage.css';
import { withAuth0 } from '@auth0/auth0-react';


class CartPage extends Component<any,any>{
    constructor(props){
        super(props)
        this.addToCart = this.addToCart.bind(this);
    }

    async addToCart(prodid){
        const { getAccessTokenSilently, user } = this.props.auth0;
            let accessToken;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `${configData.audience}`,
                });
            }catch(err){
              console.log("Error in fetching acess token " + err.message);
            }
            console.log("USer id: "+ user.sub + " productid: " + prodid)
             fetch(`${configData.apiBaseUri}${configData.apiAddToCart}${encodeURIComponent(user.sub)}/${encodeURIComponent(prodid)}`, {
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

    render() {
        const { productDetail } = this.props.location;
        console.log("In Cart " + productDetail);
        if(productDetail === undefined){
            return(
            <Redirect to="/home" />
            )
        }
        //const {productDetail} = state;
        const imagelocationArray = productDetail.imagelocation.split(',');
        console.log("First Locatio " + imagelocationArray[0])
        console.log("image Loacation Array: " + imagelocationArray);
        return (
            <ResponsiveContainer>
                <Card.Group centered style={{marginTop: 30,marginBottom:30}}>
                            <Card raised style={{minWidth: 600, minHeight: 400}}>
                                <Carousel>
                                {imagelocationArray.map((location:any,index:any) => (
                                <Carousel.Item>
                                    <Image
                                    fluid
                                    src={configData.awsS3BaseUri + location}
                                    alt={productDetail.productname}
                                    style={{minHeight: 450, maxHeight: 450}}
                                    />
                                </Carousel.Item>
                                ))}
                                </Carousel>
                            </Card>
                            <Card raised>
                                <Card.Content >
                                    <Header>Name: {productDetail.productname} <br/> By Artist: {productDetail.supplierid} </Header>
                                    <Header>₹{productDetail.price}</Header>
                                    <Header as='h4'>{productDetail.productdesc} <br />All orders are insured for transit<br/> We ship Worldwide</Header>
                                    <Button.Group size='small'>
                                    <Button onClick={() => this.addToCart(productDetail.productid)} >Add To Cart</Button>
                                    <Button.Or />
                                    <Button as={NavLink} to="/exploretraditionalart">Continue Shopping</Button>
                                    </Button.Group>
                                </Card.Content>
                                <Divider/>
                                <Card.Content extra>
                                    <Header as={NavLink} to="/home"><Icon name='mail' />Request more Information </Header>
                                    <Header as='h3'>Other Details: <br/> Size: {productDetail.size} <br/> Year: 2021 <br/> Color: {productDetail.color}</Header>
                                </Card.Content>
                            </Card>
                    </Card.Group>
                <Footer />
              </ResponsiveContainer>
        )
    }
}

export default withAuth0(CartPage);