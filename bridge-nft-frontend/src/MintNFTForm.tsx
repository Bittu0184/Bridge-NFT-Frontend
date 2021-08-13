import React from "react";
import { Button, Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";
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
            return <Container textAlign='center'>Error: {error.message}</Container>;
        } else if (!isLoaded) {
            return (
            <Segment>
                <Dimmer active inverted>
                    <Loader size='massive'/>
                </Dimmer>
            </Segment>
            );
        } else {
            return( 
                <Segment>
                    <Container>
                        <Container textAlign='center' style={{minHeight: 400}}>
                            <Header as='h3'>IPFS HASH: {values.ipfsHash}</Header>
                            <Header as='h3'>Address: {values.address}</Header>
                            <Button type='submit' size='huge' onClick={this.handleMint}>Mint Above Art</Button>
                        </Container>
                        <CustomSteps 
                            active="Mint NFT"
                            completed="1"
                        />
                    </Container>
                </Segment>
            )
        }
    }
}

export default MintNFTForm;