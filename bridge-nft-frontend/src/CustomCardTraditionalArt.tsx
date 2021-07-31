import React from "react";
import { Button, Card, Container, Grid, Icon } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import configData from './Config.json';
import { NavLink } from "react-router-dom";

class CustomCardTraditionalArt extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            isAdded: false,
            TotalItem: 0
        }
        this.addToCart = this.addToCart.bind(this);
    }

    async componentDidMount(){
      const { loginWithRedirect, getAccessTokenSilently, isAuthenticated, user } = this.props.auth0;
      if(isAuthenticated){
        let accessToken;
        try{
          accessToken = await getAccessTokenSilently({
            audience: `${configData.audience}`,
            });
        }catch(err){
          console.log("Error in fetching acess token " + err.message);
        }
        fetch(`${configData.apiBaseUri}${configData.apiGetTotalCartItem}${encodeURIComponent(user.sub)}`,{
          headers:{
            Authorization: `Bearer ${accessToken}`,
          }
        }).then((res) => (res.text()))
        .then((response) => {
          console.log("Total item from API: " + response)
          this.setState({TotalItem: response});
        }, (err) => {
          console.log("Error while getting total items: " + err.message);
        })
      }else{
        await loginWithRedirect();
      }
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
        const { metadata }  = this.props;
        return (
            <Card.Group>
            {metadata.map((data:any,index:any) => (
            <Card style={{minWidth: 350,color:'black'}} raised key={index} as={NavLink} to={{
              pathname:"/buynow",
              productDetail:{...data,FromAllProducts: true},
              }} activeStyle={{color:'black', textDecoration: 'none'}}>
                <img style={{width:350, height:350 }} src={configData.awsS3BaseUri + data.imagelocation.split(',')[0]} alt={data.productname}/>
                <Card.Content>
                    <Container>
                    <Grid>
                            <Grid.Column floated='left' width={6} >
                              <Card.Header>{data.productname}</Card.Header>
                              <Card.Meta>{data.supplierid}</Card.Meta>
                            </Grid.Column>
                            <Grid.Column floated='right' width={8} >
                                <Card.Description>
                                  <Icon name='rupee'/>{data.price}
                                </Card.Description>
                                <Card.Description>{data.productdesc}</Card.Description>
                            </Grid.Column>
                    </Grid>
                    </Container>
                    
                </Card.Content>
                
                <Card.Content extra>
                    <Container textAlign='center' className='ui two buttons horizontal'>
                        <Button.Group>
                            <Button content='Add To Cart' onClick={() => this.addToCart(data.productid)}  size='large'  label={{ basic: true , pointing: 'left', content: 'Total Item in Cart ' + this.state.TotalItem }}>
                            </Button>
                        </Button.Group>
                        
                    </Container> 
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
        )
    }
}
export default withAuth0(CustomCardTraditionalArt);
/*
<Button as={NavLink} to={{ pathname:'/buynow', state: { productDetail: {...data,fromExplore: true} } }}  size='large' animated>
                                <Button.Content visible>Buy Now</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                            <Button.Or />*/
