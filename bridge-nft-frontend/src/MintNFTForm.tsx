import React from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { fetchAPI } from "./CallAPI";
import CustomSteps from "./CustomSteps";

class MintNFTForm extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
        this.handleMint = this.handleMint.bind(this);
      }

      componentDidMount() {
        this.setState({isLoaded: true});
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
        alert(await fetchAPI(process.env.REACT_APP_API_BASE_URI + "mint_nft",strPost))
        this.props.nextStep()
    }
    render(){
        const {values} = this.props;
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return( 
                <Segment style={{minHeight: 700}}>
                    <Container  textAlign='center'>
                        <Container text>
                            <Header as='h3'>IPFS HASH: {values.ipfsHash}</Header>
                            <Header as='h3'>Address: {values.address}</Header>
                            <Button type='submit' size='huge' onClick={this.handleMint}>Mint Above Art</Button>
                        </Container>
                        <CustomSteps 
                            active="Mint NFT"
                            completed="false"
                        />
                    </Container>
                </Segment>
            )
        }
    }
}

export default MintNFTForm;