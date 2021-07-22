import { Component } from "react";
import { Button, Container, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { withAuth0 } from '@auth0/auth0-react';

class CustomFeedCart extends Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            isDeleted: false,
            dataInCart: this.props.metadata,
            totalAmt: this.props.totalAmt
        }
        this.deleteItem = this.deleteItem.bind(this);
    }
    async deleteItem(prodId){
        const { loginWithRedirect, getAccessTokenSilently, isAuthenticated } = this.props.auth0;
        if(isAuthenticated){
            const {user} = this.props.auth0;
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
              //this.setState({isDeleted: true,error: err});
              return
            }
            await fetch(`http://localhost:8282/delete/cart/item/${encodeURIComponent(user.sub)}/${encodeURIComponent(prodId)}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                })
               .then( (result) => {
                 console.log("Item Deleted " + result);
                   const {dataInCart} = this.state;
                   const removedEntry = dataInCart.filter((dataInCart) => dataInCart.productid === prodId);
                   console.log("Removed Entry "+ removedEntry[0].price);
                   const newTotal = this.state.totalAmt - removedEntry[0].price;
                   const updatedData = dataInCart.filter((dataInCart) => dataInCart.productid !== prodId);
                   this.setState({
                    isDeleted: true,
                    dataInCart: updatedData,
                    totalAmt: newTotal
                   });
                 },(error) => {
                   this.setState({
                     isDeleted: false,
                   });
                   console.log("Can not delete Error " + error);
                 })
        }else{
            await loginWithRedirect();
        }
    }
    render(){
        const { dataInCart, totalAmt }  = this.state;
        //const { totalAmt } = this.props;
        if(dataInCart == null){
            return(<div>Loading</div>)
        }
        return (
            <Container>
            <Segment>
            <Item.Group divided>
            {dataInCart.map((data:any,index:any) => (
                <Item key={index}>
                <Item.Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
          
                <Item.Content>
                  <Item.Header>{data.productname}</Item.Header>
                  <Item.Meta>
                    <span className='price'> ₹{data.price}</span>
                  </Item.Meta>
                  <Item.Description>{data.productdesc}</Item.Description>
                  <Item.Extra>
                    <Button onClick={() => this.deleteItem(data.productid)} size='small' floated='right'>
                        Delete
                        <Icon name='delete' />
                    </Button>
                    <Label>Limited</Label>
                  </Item.Extra>
                </Item.Content>

              </Item>
              
            ))}
            </Item.Group>
            </Segment>
            <Segment>
                <Container>
                    <Header floated='left' as='h3'>Total Amount: </Header>
                    <Header floated='right' as='h3'>₹{totalAmt}</Header>
                </Container>
            </Segment>
            </Container>
        )
    }
}

export default withAuth0(CustomFeedCart);