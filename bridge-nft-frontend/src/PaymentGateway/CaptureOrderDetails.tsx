import { Component } from "react";
import { Button, Container, Dimmer, Form, Grid, Header, Loader, Message, Segment } from "semantic-ui-react";
import { withAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";
import ResponsiveContainer from "../ResponsiveContainer";
import Footer from "../Footer";
import PayByRazorPay from "./PayByRazorPay";
import configData from '../Config.json';
import axios from "axios";

class CaptureOrderDetails extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            isLoaded: true,
            metadata: [],
            error: null,
            value: '',
            isSubmitWaiting: false,
            ResponseMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event:any) {
        this.setState({isSubmitWaiting: true})
        event.preventDefault();
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        if(data == null){
            alert("Please Fill all details");
            return 
        }
        data.append("amount", "100")
        const {productDetail } = this.props.location;
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
        data.append("supid",supid)
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
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` }
            }
            
            await axios.post(process.env.REACT_APP_API_BASE_URI + configData.apiCreateOrder, data, config)
            .then(response => {
                this.setState({
                    isSucceess: true,
                    isSubmitWaiting: false,
                    ResponseMessage: JSON.stringify(response)
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

    handleCategory = (e, { value }) => this.setState({ value })


    render() {
        const { isLoaded, error, ResponseMessage, isSubmitWaiting } = this.state;
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
                <Message>
                    We are facing some issues. Please try again later.
                </Message>
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
                        {productDetail.dataInCart.map((data,index) => (
                            <p>{data.productname}</p>
                        ))}
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Message
                    attached
                    header='Happy Shopping!!'
                    content='Fill out the form below to complete you order!'
                    />
                    <Form size="small" id="formToMintNFT" loading={isSubmitWaiting}>
                        <Form.Input name="address" onChange={this.handleChange('address')} placeholder='Delivery Address' control='textarea' rows='3'/>
                        <Form.Input name="state" onChange={this.handleChange('state')} placeholder='state' />
                        <Form.Group inline>
                        <Form.Input name="pincode" onChange={this.handleChange('pincode')} placeholder='PIN' type="tel"/>
                        <Form.Input name="phone" onChange={this.handleChange('phone')} placeholder='Phone' type="tel"/>
                        </Form.Group>
                        <Button onClick={this.handleSubmit}>Proceed to Payment</Button>
                        <PayByRazorPay name='testname' desc='testdesc' amount={productDetail.totalAmt} orderid='' />
                        <Message>{ResponseMessage}</Message>
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