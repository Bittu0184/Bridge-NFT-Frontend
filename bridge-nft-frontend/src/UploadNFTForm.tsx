import React from "react";
import { Button, Checkbox, Container, Dimmer, Form } from "semantic-ui-react";
import { fetchAPI } from "./CallAPI";
import axios from 'axios';
import CustomSteps from "./CustomSteps";

class UploadNFTForm extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        /*this.state = {
            image: '',
            n: '',
            description: '',
            ipfsHash: '',
            address: this.props.address,
            completed: false
        };*/
       // this.handleChangeName = this.handleChangeName.bind(this);
       // this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

/*
    handleChangeName(event:any) {
        this.setState({n: event.target.n});
    }
    handleChangeDescription(event:any) {
        this.setState({description: event.target.description});
    }*/
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
               // this.props.updateCompleted(1);
                //this.setState({ipfsHash: response.data['IpfsHash']});
                //this.setState({completed:true});
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.props.values.address);
            });
            this.props.nextStep()
      }
/*
    async handleMint(e){
        alert("Uploading this: " + this.state.ipfsHash + "To  Address: " + this.state.address);
        e.preventDefault();
        const postBody = {
          address: this.state.address,
          datatomint: this.state.ipfsHash
        };
        const strPost = JSON.stringify(postBody);
        alert(strPost)
        alert(await fetchAPI('http://localhost:8282/mint_nft',strPost))
    }
*/
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