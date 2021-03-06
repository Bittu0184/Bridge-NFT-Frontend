import React from "react";
import axios from 'axios';
import { Form,Checkbox,Button,Container, Dimmer } from 'semantic-ui-react';
import './MintNFT.css';
import { connectWallets } from './ConnectWallet';
import { fetchAPI } from './CallAPI';
const { abi } = require('../src/BridgeCraft.json');
import configData from './Config.json';

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
        await connectWallets().then((web3) => {
          const accounts = web3.eth.getAccounts().then((acc) => alert('Address acccount: ' + acc[0]));
          this.setState({address: accounts[0]});
          this.setState({showUserForm: true});
        }).catch((err) => {alert("err while connecting "+ err)}); 
      }
    
      handleChangeName(event:any) {
        this.setState({n: event.target.n});
      }

      handleChangeDescription(event:any) {
        this.setState({description: event.target.description});
      }
    
      handleSubmit(event:any) {
        event.preventDefault();
        const data = new FormData(document.forms.namedItem("formToMintNFT"));
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        axios.post(process.env.REACT_APP_API_BASE_URI + configData.apiUploadArt, data, config)
            .then(response => {
                this.setState({ipfsHash: response.data['IpfsHash']});
            })
            .catch(error => {
                console.log("Errorr: " + error + " Address: " + this.state.address);
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
        console.log(strPost)
        console.log(await fetchAPI('http://localhost:8282/mint_nft',strPost))
        const web3 = await connectWallets(); 
        const instance = new web3.eth.Contract(abi, "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69");
        web3.eth.getCoinbase().then((coin) => {
          web3.eth.defaultAccount = coin
        });
          instance.methods.approve("0xE29824d23619204146e675Dc93b35e616D748da2",4).send({from: this.state.address})
            .then((tx) => {
              console.log('tx hash : ' + tx);
              
            })
            .catch((err) => {console.log('error: ' + err)});
      }
      
      async transferNFT(e){
        e.preventDefault();
        const web3 = await connectWallets(); 
         const instance = new web3.eth.Contract(abi, "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69");
        web3.eth.getAccounts().then((acc) => {
          web3.eth.defaultAccount = "0x56a5372Dd84f2F1D4cF6B43c4c1FF59427dc0A69";
          instance.methods.safeTransferFrom("0xE29824d23619204146e675Dc93b35e616D748da2",acc[0],4).send({from: "0xE29824d23619204146e675Dc93b35e616D748da2"})
                  .then((tx) => {alert('tx hash for transfer: ' + tx)})
                  .catch((err) => {alert('error: ' + err)});

          })
      }

      render() {
        return (
          <div>
            <Container>
              <Form size="large" id="formToMintNFT">
                <Form.Field>
                  <label>NFT Title</label>
                  <input name="n" value={this.state.n} onChange={this.handleChangeName} placeholder='Cryptokitties' />
                </Form.Field>
                <Form.Field name="description" value={this.state.description} onChange={this.handleChangeDescription} label='NFT Description' control='textarea' rows='4' />
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

