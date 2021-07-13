import React from "react";
import { Button, Card, Container, Image } from "semantic-ui-react";
import CustomCard from "./Card";
//import axios from 'axios';
import CustomSteps from "./CustomSteps";

class MintNFTForm extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
        this.handleMint = this.handleMint.bind(this);
      }

      componentDidMount() {
        fetch("https://gateway.pinata.cloud/ipfs/"+ this.props.values.ipfsHash)
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoaded: true,
                metadata: result.metadata
              });
              console.log(this.state.metadata);
            },(error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
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
        //alert(await fetchAPI('http://localhost:8282/mint_nft',strPost))
    }
/*
    async componentDidMount(){
        alert("IPFS HASH" + this.props.values.ipfsHash);
        await axios.get("https://gateway.pinata.cloud/ipfs/" + this.props.values.ipfsHash)
            .then((res) => {
                this.setState({metadata: res.data});
            })
            .catch((err) => console.log(err));
        console.log("Image URL" + this.state.imageIPFS);
    }

*/
    render(){
        const {values} = this.props;
        const {metadata} = this.state;
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return( 
                <div>
                    <CustomCard metadata={this.state.metadata}/>
                    <Container text>
                        <p>IPFS HASH: {values.ipfsHash}</p>
                        <p>Address: {values.address}</p>
                        <Button type='submit' onClick={this.handleMint}>Mint Above Art</Button>
                    </Container>
                    <CustomSteps 
                        active="Mint NFT"
                        completed="false"
                    />
                </div>
            )
        }
    }
}

export default MintNFTForm;