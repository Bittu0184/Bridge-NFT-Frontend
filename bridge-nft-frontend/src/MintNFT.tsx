import React from "react";
import axios from 'axios';
//import { Form } from "react-bootstrap";
import { Form,Checkbox,Button,Container, Dimmer } from 'semantic-ui-react';
import './MintNFT.css';
import { connectWallets } from './ConnectWallet';
import {fetchAPI} from './CallAPI';

class MintNFT extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            image: '',
            n: '',
            description: '',
            ipfsHash: '',
            address: '',
            showUserForm: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMint = this.handleMint.bind(this);
        this.hideUserForm = this.hideUserForm.bind(this); 
      }

      async componentDidMount(){
        const add = await connectWallets();
        this.setState({address: add});
        this.setState({showUserForm: true});
      }
    
      handleChangeName(event:any) {
        this.setState({n: event.target.n});
      }

      handleChangeDescription(event:any) {
        this.setState({description: event.target.description});
      }
    
      handleSubmit(event:any) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.n);
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        axios.post("http://localhost:8282/upload_IPFS_pinata", data, config)
            .then(response => {
                alert("Success: " + response + "Address: " + this.state.address);
                alert("Hash Generated: " + response.data['IpfsHash']);
                this.setState({ipfsHash: response.data['IpfsHash']});
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.state.address);
            });
      }

      hideUserForm(){
        this.setState({showUserForm: false});
      }

      handleMint(e){
        alert("Uploading this: " + this.state.ipfsHash + "To  Address: " + this.state.address);
        e.preventDefault();
        const postBody = {
          address: this.state.address,
          datatomint: this.state.ipfsHash
        };
        const strPost = JSON.stringify(postBody);
        alert(strPost)
        fetchAPI('http://localhost:8282/mint_nft',strPost);
      }
    
      render() {
        return (
          <div>
            <Container>
              <Form size="large" id="formToMintNFT">
                <Form.Field>
                  <label>NFT Title</label>
                  <input name="n" placeholder='Cryptokitties' />
                </Form.Field>
                <Form.Field name="description" label='NFT Description' control='textarea' rows='4' />
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
            <button onClick={this.handleMint}>Mint Uploaded Art</button>

            <Dimmer active={this.state.showUserForm} onClickOutside={this.hideUserForm} page>
              <Form>
                <Form.Field>
                  <label>NFT Title</label>
                  <input name="n" placeholder='Cryptokitties' />
                </Form.Field>
                <Form.Field>
                  <label>NFT Title</label>
                  <input name="n" placeholder='Cryptokitties' />
                </Form.Field>
              </Form>
            </Dimmer>
          </div>
        );
      }
}
export default MintNFT;

