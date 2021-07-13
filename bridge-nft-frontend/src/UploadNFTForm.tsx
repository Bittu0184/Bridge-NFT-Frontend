import React from "react";
import { Button, Checkbox, Container, Form } from "semantic-ui-react";
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
            <div>
                <Container text>
                    <Form size="large" id="formToMintNFT">
                        <Form.Field>
                            <label>NFT Title</label>
                            <input name="n" onChange={this.props.handleChange('n')} placeholder='Cryptokitties' />
                        </Form.Field>
                        <Form.Field name="description"  onChange={this.props.handleChange('description')} label='NFT Description' control='textarea' rows='4' />
                        <Form.Field>
                            <label>Upload file image or gif</label>
                            <input type='file' name="fileToUpload"/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
                    </Form>            
                </Container>
                <CustomSteps 
                    active="Upload Art"
                    completed={values.completed}
                    ipfsHash={values.ipfsHash}
                />
            </div>
            
        )
    }
}

export default UploadNFTForm;