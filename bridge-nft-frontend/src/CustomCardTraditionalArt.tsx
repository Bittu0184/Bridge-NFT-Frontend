import React from "react";
import { Button, Card, Container, Grid, Icon } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
//import configData from './Config.json';
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
     /* const { loginWithRedirect, getAccessTokenSilently, isAuthenticated, user } = this.props.auth0;
      if(isAuthenticated){
        let accessToken;
        try{
          accessToken = await getAccessTokenSilently({
            audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
            });
        }catch(err){
          console.log("Error in fetching acess token " + err.message);
        }
        fetch(`${process.env.REACT_APP_API_BASE_URI}${configData.apiGetTotalCartItem}${encodeURIComponent(user.sub)}`,{
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
      }*/
    }

    async addToCart(prodid){
       /* const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated } = this.props.auth0;
        if(!isAuthenticated){
          await loginWithRedirect;
        }else{
            let accessToken;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
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
        }*/
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
                <img style={{width:350, height:350 }} src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} alt={data.productname}/>
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
                            <Button content='Coming Soon!!' onClick={() => this.addToCart(data.productid)}  size='medium' >
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