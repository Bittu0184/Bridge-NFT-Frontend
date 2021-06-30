import React from "react";
import { Button, Checkbox, Container, Form } from "semantic-ui-react";
import { fetchAPI } from "./CallAPI";
import axios from 'axios';
import CustomSteps from "./CustomSteps";
import UploadNFTForm from "./UploadNFTForm";
import MintNFTForm from "./MintNFTForm";

class UploadAndMintHandler extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            step: 1,
            image: '',
            n: '',
            description: '',
            ipfsHash: '',
            address: this.props.address,
            completed: 0
        };
       // this.handleChangeName = this.handleChangeName.bind(this);
      //  this.handleChangeDescription = this.handleChangeDescription.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
      this.updateIPFSHash = this.updateIPFSHash.bind(this);
    }

    nextStep = () => {
        const { step, completed } = this.state
        this.setState({
            step : step + 1,
            completed: completed + 1
        })
    }

    prevStep = () => {
        const { step, completed } = this.state
        this.setState({
            step : step - 1,
            completed: completed -1
        })
    }
    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }
    updateIPFSHash(hashvalue){
        this.setState({ipfsHash: hashvalue});
    }
/*
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
                this.setState({completed:true});
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.state.address);
            });
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
    }
*/
    render(){
        const {step} = this.state;
        const {image,n,description,ipfsHash,address,completed} = this.state;
        const values  = {image,n,description,ipfsHash,address,completed};
        switch(step) {
            case 1:
                return  <UploadNFTForm
                        nextStep={this.nextStep}
                        handleChange = {this.handleChange}
                        values={values}
                        updateIPFSHash={this.updateIPFSHash}
                        />
            case 2:
                return  <MintNFTForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        values={values}    
                        /> 
            case 3:
                return <div></div>
        }
    }
}

export default UploadAndMintHandler;