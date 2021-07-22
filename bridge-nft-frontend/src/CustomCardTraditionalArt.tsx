import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Container, Grid, Icon, Image } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';


class CustomCardTraditionalArt extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            isAdded: false,
            TotalItem: 0
        }
        this.addToCart = this.addToCart.bind(this);
    }

    async addToCart(data){
        const { loginWithRedirect, getAccessTokenSilently, user } = this.props.auth0;
            const domain = "unfoldinnovates.com";
            let accessToken;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `https://${domain}`,
                scope: "read:current_user",
                });
            }catch(err){
              console.log("Error in fetching acess token " + err.message);
              await loginWithRedirect();
              this.setState({isLoaded: true,error: err});
              return
            }
            const dataToPass = {...data, userid: user.sub}
             console.log("Data In add " + JSON.stringify(dataToPass));
             fetch("http://localhost:8282/add/to/cart", {
                 method:'POST',
               headers: {
                 Authorization: `Bearer ${accessToken}`,
               },
               body: JSON.stringify(dataToPass)
               })
              .then(res => res.json())
              .then( (result) => {
                console.log("Response For Add to cart API " + result.Message);
                  this.setState({
                    isAdded: true,
                    TotalItem: this.state.TotalItem + 1,
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
        //console.log("custom Card " + metadata);
        return (
            <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
            {metadata.map((data:any,index:any) => (
            <Card raised link key={index}>
                <Image size="medium" src={`https://gateway.pinata.cloud/ipfs/${data.ipfsID}`} alt={data.productname} rounded bordered wrapped ui={false} />
                <Card.Content>
                    <Container>
                    <Grid>
                            <Grid.Column floated='left' width={6} >
                            <Card.Header>{data.productname}</Card.Header>
                            <Card.Meta>{data.supplierid}</Card.Meta>
                            </Grid.Column>
                            <Grid.Column floated='right' width={8} >
                                <Card.Description left>
                                <Icon name='rupee'/>{data.price}
                                </Card.Description>
                                <Card.Description left>{data.productdesc}</Card.Description>
                            </Grid.Column>
                    </Grid>
                    </Container>
                    
                </Card.Content>
                
                <Card.Content extra>
                    <Container className='ui two buttons horizontal'>
                        <Button.Group fluid>
                            <Button as={NavLink} to={{ pathname:'/buynow', state: { productDetail: {...data,fromExplore: true} } }}  size='large' animated>
                                <Button.Content visible>Buy Now</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                            <Button.Or />
                            <Button content='Add To Cart' onClick={() => this.addToCart(data)}  size='large'  label={{ basic: true , pointing: 'left', content: this.state.TotalItem }}>
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