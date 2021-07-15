import React from "react";
import { Button, Checkbox, Container, Form, Grid, Segment } from "semantic-ui-react";
import axios from 'axios';
import CustomSteps from "./CustomSteps";

class UploadNFTForm extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event:any) {
        event.preventDefault();
        alert('A name was submitted: ' + this.props.values.n);
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        await axios.post("http://localhost:8282/upload_IPFS_pinata", data, config)
            .then(response => {
                alert("Success: " + response + "Address: " + this.props.values.address);
                alert("Hash Generated: " + response.data['IpfsHash']);
                this.props.updateIPFSHash(response.data['IpfsHash']);
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.props.values.address);
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