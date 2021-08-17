import { Component } from "react";
import { Button, Checkbox, Container, Dimmer, Form, Grid, GridColumn, Header, Loader, Message, Radio, Segment } from "semantic-ui-react";
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
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetCategory)
          .then(res => res.json())
          .then( (result) => {
              console.log("RESult category: " + JSON.stringify(result))
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
                console.log("Success: " + JSON.stringify(response));
            })
            .catch(error => {
                console.log("Errorr: " + error);
            });
        }
    }


    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleCategory = (e, { value }) => this.setState({ value })


    render() {
        const { isLoaded, value, error, metadata } = this.state;
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
            <GridColumn width={10}>
                    <Message
                    attached
                    header='Welcome to our site!'
                    content='Fill out the form below to add new products!'
                    />
                    <Form size="small" id="formToMintNFT">
                        <Form.Input name="name" onChange={this.handleChange('name')} placeholder='Title' />
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
                        <Form.Input name="size" onChange={this.handleChange('size')} placeholder='size' />
                        <Form.Input placeholder='Upload Art Image' type='file' name="fileToUpload"/>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' size='huge' onClick={this.handleSubmit}>Submit</Button>
                    </Form>          
                </GridColumn>
                <GridColumn width={10}>
                    <Container>
                        <Header as='h2'>Added Products</Header>
                        <Message>Coming Soon</Message>
                    </Container>
                </GridColumn>
            </Grid>  
        </Container>
        )}
    }
}

export default withAuth0(AddProduct);