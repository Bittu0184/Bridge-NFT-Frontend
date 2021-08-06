import React from "react";
import { Card, Dimmer, Loader, Segment } from "semantic-ui-react";
import CustomCard from "./Card";
import { connectWallets } from './ConnectWallet';
import Footer from "./Footer";
import './MintNFT.css';
import ResponsiveContainer from "./ResponsiveContainer";
import configData from './Config.json';

class AccountPage extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            error: null,
            isLoaded: false,
            metadata: [],
            showUserForm: false
        };
        this.mintPopToggle = this.mintPopToggle.bind(this);
        this.mintPopUp = this.mintPopUp.bind(this);
    }

    async componentDidMount(){
        await connectWallets().then((web3) => {
            web3.eth.getAccounts().then(async (acc) => {
                console.log('Address acccount: ' + acc[0])
                this.setState({address: acc[0]});
                const postbody = acc[0];
                console.log("URL ACcount page: "+ process.env.REACT_APP_API_BASE_URI + configData.apiGetMetadata)
                await fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetMetadata, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postbody),
                  })
                  .then(response => response.json())
                  .then(data => {
                    this.setState({
                        isLoaded: true,
                        metadata: data.metadata
                    });
                  })
                  .catch((error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                  });
            })
        }).catch((err) => {alert("err while connecting "+ err)}); 
    }

    mintPopUp(){
        this.setState({showUserForm: true});
    }

    mintPopToggle(val){
        this.setState({showUserFrom: val});
    }

    render(){
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
            <ResponsiveContainer>
                <Segment style={{minHeight: 800}}>
                  <Dimmer inverted active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
            )
        } else {
            return (
                <ResponsiveContainer>
                    <div className="mintNFTContainer">
                        <Card centered  raised link href="/mintnft">
                            <Card.Content>
                                <Card.Header>Mint New NFT!!</Card.Header>
                                <Card.Meta></Card.Meta>
                                <Card.Description>
                                You can mint a new nft by clicking here and upload your digital master piece!! 
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                    <CustomCard metadata={this.state.metadata}/>
                </ResponsiveContainer>
            ); 
        }
    }

}

export default AccountPage;
