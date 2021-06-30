import React from "react";
import { Button, Checkbox, Container, Form } from "semantic-ui-react";
import { fetchAPI } from "./CallAPI";
import axios from 'axios';
import CustomSteps from "./CustomSteps";

class MintNFTForm extends React.Component<any,any> {
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
        this.handleMint = this.handleMint.bind(this);

    }


    async handleMint(e){
        alert("Uploading this: " + this.props.values.ipfsHash + "To  Address: " + this.props.values.address);
        e.preventDefault();
        const postBody = {
          address: this.props.values.address,
          datatomint: this.props.values.ipfsHash
        };
        const strPost = JSON.stringify(postBody);
        alert(strPost)
        alert(await fetchAPI('http://localhost:8282/mint_nft',strPost))
    }

    render(){
        const {values} = this.props;
        return(
            <div>
                <Container text>
                    <p>IPFS HASH: {values.ipfsHash}</p>
                    <p>Adddress: {values.address}</p>
                    <Button type='submit' onClick={this.handleMint}>Mint</Button>
                </Container>
                <CustomSteps 
                    active="Mint NFT"
                    completed="false"
                />
            </div>
            
        )
    }
}

export default MintNFTForm;