import React from "react";
import axios from 'axios';
import { Form,Checkbox,Button,Container, Dimmer } from 'semantic-ui-react';
import './MintNFT.css';
import { connectWallets } from './ConnectWallet';
import { fetchAPI } from './CallAPI';
const { abi } = require('../src/BridgeCraft.json')

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
        this.transferNFT = this.transferNFT.bind(this);
      }

      async componentDidMount(){
        const web3 = await connectWallets();
        
        const accounts = web3.eth.getAccounts().then((acc) => alert('Address acccount: ' + acc));
        //alert('Address acccount: ' + accounts);
        this.setState({address: accounts});
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
        const web3 = await connectWallets(); 
       //web3.eth.personal.unlockAccount("0x7D80B2e84fC91A330D36d80E4C0050896AcC59D4","testpassword",500);
        const instance = new web3.eth.Contract(abi, "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69");
        web3.eth.getCoinbase().then((coin) => {
          web3.eth.defaultAccount = coin
        });
        web3.eth.getAccounts().then((acc) => {
          instance.methods.approve("0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69",4).send({from: "0x4FBD492820852D4210270CB254Ebf7d2e010Ae0f"})
            .then((tx) => {
              alert('tx hash : ' + tx);
              
            })
            .catch((err) => {alert('error: ' + err)});
        });
      }
      
      async transferNFT(e){
        e.preventDefault();
        const web3 = await connectWallets(); 
       //web3.eth.personal.unlockAccount("0x7D80B2e84fC91A330D36d80E4C0050896AcC59D4","testpassword",500);
         const instance = new web3.eth.Contract(abi, "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69");
        /* web3.eth.getCoinbase().then((coin) => {
           alert('coinbase: ' + coin)
           web3.eth.defaultAccount = coin
         });*/
        //web3.utils.toChecksumAddress("0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69")
        web3.eth.defaultAccount = "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69";
        instance.methods.safeTransferFrom("0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69","0xb42C73351E636C2A2193773Bf9647E2331773294",4).send({from: "0xb42C73351E636C2A2193773Bf9647E2331773294"})
                .then((tx) => {alert('tx hash for transfer: ' + tx)})
                .catch((err) => {alert('error: ' + err)});
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
            <button onClick={this.transferNFT}>Transfer NFT</button>

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

