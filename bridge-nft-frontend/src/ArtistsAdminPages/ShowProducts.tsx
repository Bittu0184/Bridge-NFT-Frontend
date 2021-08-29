import React from "react";
import { Icon, Message, Item, Button } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import configData from '../Config.json';


class ShowProducts extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            visible:'false',
            value: ''
        }
        this.setVisible = this.setVisible.bind(this)
    }
    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleCategory = (e, { value }) => this.setState({ value })


    setVisible(f: boolean){
        this.setState({visible: f})
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

    render() {
        const { metadata }  = this.props;
        const {visible,value} = this.state;
        if(metadata == null){
            return (
                <Message>
                    <Message.Header>No Products Added</Message.Header>
                </Message>
            )
        }
        else{
        return (
        <Item.Group>
                {metadata.map((data:any,index:any) => (
                <Item key={index}>
                <Item.Image  width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} alt={data.productname}/>
                <Item.Content>
                    <Item.Header>{data.productname}</Item.Header>
                    <Item.Meta>
                    <Icon name='rupee'/>{data.price}
                    </Item.Meta>
                    <Item.Description>{data.productdesc}</Item.Description>
                    <Item.Extra>
                    <Button icon primary floated='right' onClick={() => this.setVisible(true)} >
                        <Icon name='edit' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
                </Item>
                ))}
            </Item.Group>
        )}
    }
}
export default withAuth0(ShowProducts);

/*import React from "react";
import { Icon, Message, Item, Button, Sidebar, Form, Radio, Checkbox } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import configData from '../Config.json';


class ShowProducts extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            visible:'false',
            value: ''
        }
        this.setVisible = this.setVisible.bind(this)
    }
    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleCategory = (e, { value }) => this.setState({ value })


    setVisible(f: boolean){
        this.setState({visible: f})
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

    render() {
        const { metadata }  = this.props;
        const {visible,value} = this.state;
        if(metadata == null){
            return (
                <Message>
                    <Message.Header>No Products Added</Message.Header>
                </Message>
            )
        }
        else{
        return (
            <Sidebar.Pushable as={Item} raised>
                    <Sidebar
                      as={Form}
                      animation='scale down'
                      icon='labeled'
                      onHide={() => this.setVisible(false)}
                      vertical
                      visible={visible}
                      width='thin'
                      direction='left'
                    >
                      <Form size="tiny" id="formToMintNFT">
                        <Form.Input name="name" onChange={this.handleChange('name')} placeholder='Title'/>
                        <Form.Input name="description" onChange={this.handleChange('description')} placeholder='Description' control='textarea' rows='4' />
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
                        <Message>test</Message>
                        </Form>
                    </Sidebar>
                {metadata.map((data:any,index:any) => (
                    <Sidebar.Pusher>
                <Item key={index}>
                <Item.Image  width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} alt={data.productname}/>
                <Item.Content>
                    <Item.Header>{data.productname}</Item.Header>
                    <Item.Meta>
                    <Icon name='rupee'/>{data.price}
                    </Item.Meta>
                    <Item.Description>{data.productdesc}</Item.Description>
                    <Item.Extra>
                    <Button icon primary floated='right' onClick={() => this.setVisible(true)} >
                        <Icon name='edit' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
                </Item>
                </Sidebar.Pusher>
                ))}
            </Sidebar.Pushable>
        )}
    }
}
export default withAuth0(ShowProducts);

*/