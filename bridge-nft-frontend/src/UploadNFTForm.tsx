import React from "react";
import { Button, Checkbox, Container, Form, Grid, Segment } from "semantic-ui-react";
import axios from 'axios';
import CustomSteps from "./CustomSteps";
import configData from './Config.json';
class UploadNFTForm extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event:any) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.props.values.n);
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        await axios.post(configData.apiBaseUri + configData.apiUploadArt, data, config)
            .then(response => {
                console.log("Success: " + response + "Address: " + this.props.values.address);
                console.log("Hash Generated: " + response.data['IpfsHash']);
                this.props.updateIPFSHash(response.data['IpfsHash']);
            })
            .catch(error => {
                console.log("Errorr: " + error + " Address: " + this.props.values.address);
            });
            this.props.nextStep()
    }
    
    render(){
        const { values } = this.props;
        return(
            <Segment style={{minHeight: 500}}>
                <Container centered textAlign='center'>
                <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Container textAlign='center' style={{padding: '3em 0em'}}>
                    <Form size="large" id="formToMintNFT">
                        <Form.Field>
                            <input name="n" onChange={this.props.handleChange('n')} placeholder='NFT Title' />
                        </Form.Field>
                        <Form.Field name="description"  onChange={this.props.handleChange('description')} placeholder='NFT Description' control='textarea' rows='4' />
                        <Form.Field>
                            <input placeholder='Upload file image or gif' type='file' name="fileToUpload"/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' size='huge' onClick={this.handleSubmit}>Submit</Button>
                    </Form>            
                </Container>
                </Grid.Column>
            </Grid>
                <CustomSteps 
                    active="Upload Art"
                    completed={values.completed}
                    ipfsHash={values.ipfsHash}
                />
            </Container>
            
            </Segment>   
        )
    }
}

export default UploadNFTForm;