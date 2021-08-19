import { Component } from "react";
import { Button, Checkbox, Container, Dimmer, Divider, Form, Grid, GridRow, Header, Loader, Message, Radio, Segment } from "semantic-ui-react";
import configData from '../Config.json';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";

class AddProduct extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            isLoaded: false,
            metadata: [],
            error: null,
            value: '',
            isSubmitWaiting: false,
            ResponseMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetCategory)
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoaded: true,
                metadata: result
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          )
    }

    async handleSubmit(event:any) {
        this.setState({isSubmitWaiting: true})
        event.preventDefault();
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        if(data == null){
            alert("Please upload some art.");
            return 
        }
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
            await axios.post(process.env.REACT_APP_API_BASE_URI + configData.apiAddProduct, data, config)
            .then(response => {
                console.log("response " + JSON.stringify(response))
                if (response.status === 400){
                    this.setState({
                        isSucceess: false,
                        ResponseMessage: "Some inputs were incorrect, please check and try again."
                    })
                }
                this.setState({
                    isSucceess: true,
                    isSubmitWaiting: false,
                    ResponseMessage: "Successfully Added Product."
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isSubmitWaiting: false,
                    ResponseMessage: "We are facing an issue. Please try again later."
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
        const { isLoaded, value, error, metadata, ResponseMessage, isSubmitWaiting } = this.state;
        if(!isLoaded){
            return(
                <Segment style={{minHeight: 500}}>
                    <Dimmer active>
                        <Loader size='massive'/>
                    </Dimmer>
                </Segment>
            )
        }else if(error){
            return(
                <Message>
                    We are facing some issues. Please try again later.
                </Message>
            )
        }
        else{
        return(
        <Container textAlign='center' style={{padding: '3em 0em'}}>
            <Grid stackable centered>
                <GridRow>
                    <Message
                    attached
                    header='Welcome to our site!'
                    content='Fill out the form below to add new products!'
                    />
                    <Form size="small" id="formToMintNFT" loading={isSubmitWaiting}>
                        <Form.Input name="name" onChange={this.handleChange('name')} placeholder='Title'/>
                        <Form.Input name="description"  onChange={this.handleChange('description')} placeholder='Description' control='textarea' rows='4' />
                        <Form.Input name="price" onChange={this.handleChange('price')} placeholder='Price' type="number"/>
                        <Form.Group inline>
                            <label>Category</label>
                            {metadata.map((data,index) => (
                                <Form.Field
                                control={Radio}
                                label={data.categoryname}
                                value={data.categoryid}
                                checked={value === data.categoryid}
                                onChange={this.handleCategory}
                                name='catid'
                                />
                            ))}
                        </Form.Group>
                        <Form.Input name="size" onChange={this.handleChange('size')} placeholder='size' type="number"/>
                        <Form.Input placeholder='Upload All Art Images' type='file' name="fileToUpload" multiple/>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' size='huge' onClick={this.handleSubmit}>Submit</Button>
                        <Message>{ResponseMessage}</Message>
                    </Form>          
                </GridRow>
                <GridRow>
                <Container>
                <Divider/>
                <Header as='h2'>Added Products</Header>
                <Message>Coming Soon</Message>
                </Container>
                </GridRow>
            </Grid>  
            
        </Container>
        )}
    }
}

export default withAuth0(AddProduct);