import { Component } from "react";
import { Button, Container, Dimmer, Form, Grid, Header, Icon, Item, Loader, Message, Segment } from "semantic-ui-react";
import { withAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";
import ResponsiveContainer from "../ResponsiveContainer";
import Footer from "../Footer";
import configData from '../Config.json';
import axios from "axios";
import PayByRazorPay from "./PayByRazorPay";

class CaptureOrderDetails extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            isLoaded: true,
            metadata: [],
            error: null,
            value: '',
            isSubmitWaiting: false,
            ResponseMessage: '',
            isSucceess: false,
            orderId:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        console.log("Inside submit")
        this.setState({isSubmitWaiting: true})
        event.preventDefault();
        const dataToPass = new FormData(document.forms.namedItem("addressForm"));
        if(dataToPass == null){
            alert("Please Fill all details");
            return 
        }
        const {productDetail } = this.props.location;
        dataToPass.append("amount", productDetail.totalAmt)
        let supid = '',prodid =''
        productDetail.dataInCart.map((detail,index) =>{ 
            if(supid === ''){
                supid = detail.supplierid
                prodid = detail.productid
            }else{
                supid = supid + "," + detail.supplierid
                prodid = prodid + "," + detail.productid
            }
            return null
        })
        dataToPass.append("supid",supid)
        dataToPass.append("prodid",prodid)
        const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = this.props.auth0;
        if(!isAuthenticated){
          await loginWithRedirect();
        }else{
            let accessToken;
            try{
              accessToken = await getAccessTokenSilently({
                audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
                });
            }catch(err){
              console.log("Error in fetching acess token " + err.message);
            }
            const config = {     
                headers: {  'content-type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` }
            }
            console.log("Calling api " + dataToPass.get("phone"))
            await axios.post(process.env.REACT_APP_API_BASE_URI + configData.apiCreateOrder, dataToPass, config)
            .then(response => {
                console.log(JSON.stringify(response.data))
                this.setState({
                    isSucceess: true,
                    isSubmitWaiting: false,
                    ResponseMessage: "Address Recorded!",
                    orderId: response.data
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isSubmitWaiting: false,
                    ResponseMessage: error
                })
                console.log("Error: " + error);
            });
        }
        
    }


    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }


    render() {
        const { isLoaded, error, isSubmitWaiting, isSucceess, orderId } = this.state;
        if(!isLoaded){
            return(
                <ResponsiveContainer>
                <Segment style={{minHeight: 500}}>
                    <Dimmer active>
                        <Loader size='massive'/>
                    </Dimmer>
                </Segment>
                <Footer/>
                </ResponsiveContainer>
            )
        }else if(error){
            return(
                <ResponsiveContainer>
                    <Container>
                    <Message>
                        We are facing some issues. Please try again later.
                    </Message>
                    </Container>
                    <Footer/>
                </ResponsiveContainer>
            )
        }
        else{
        const { productDetail } = this.props.location;
        if(productDetail === undefined){
            return(
            <Redirect to="/home" />
            )
        }
        return(
        <ResponsiveContainer>
        <Container textAlign='center' style={{minHeight:550}}>
            <Grid stackable centered  columns={2} style={{marginTop: 20}}>
                <Grid.Column>
                    <Container>
                        <Header>Items Selected:</Header>
                        <Item.Group divided>
                        {productDetail.dataInCart.map((data,index) => (
                            <Item key={index}>
                            <Item.Image size='tiny' src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} />
                            <Item.Content>
                              <Item.Header>{data.productname}</Item.Header>
                              <Item.Meta>
                                <span className='price'>₹{data.price}</span>
                              </Item.Meta>
                              <Item.Description>{data.productdesc}</Item.Description>
                              <Button size='tiny' floated='right' icon>
                                    Delete
                                    <Icon name='delete' />
                                </Button>
                            </Item.Content>
                            </Item>
                        ))}
                        </Item.Group>
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Message
                    attached
                    header='Happy Shopping!!'
                    content='Fill out the form below to complete you order!'
                    />
                     <Form size="small" id="addressForm" loading={isSubmitWaiting}>
                        <Form.Input name="address" onChange={this.handleChange('address')} placeholder='Delivery Address' control='textarea' rows='3'/>
                        <Form.Input name="state" onChange={this.handleChange('state')} placeholder='state' />
                        <Form.Group inline>
                        <Form.Input name="pincode" onChange={this.handleChange('pincode')} placeholder='PIN' />
                        <Form.Input name="phone" onChange={this.handleChange('phone')} placeholder='Phone' />
                        </Form.Group>
                        {isSucceess ?<PayByRazorPay amount={productDetail.totalAmt} orderid={orderId}/> : <Button type='submit' size='huge' onClick={this.handleSubmit}>Submit</Button>}
                    </Form>       
                </Grid.Column>
            </Grid>  
        </Container>
        <Footer/>
        </ResponsiveContainer>
        )}
    }
}

export default withAuth0(CaptureOrderDetails);

/*
 <Message>We are working very hard to start accepting orders as soon as possible. Your order is recorded and we will inform you when we start delivering  products and then if you are still intersted, we will deliver these products to you. Thank you!</Message>
*/