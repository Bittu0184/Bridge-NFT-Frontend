import React from "react";
import {  Container,Image, Dimmer, Header, Loader, Segment, Divider, Message } from "semantic-ui-react";
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
            showUserForm: false,
            isWebEnabled: false
        };
        this.mintPopToggle = this.mintPopToggle.bind(this);
        this.mintPopUp = this.mintPopUp.bind(this);
    }

    async componentDidMount(){
        await connectWallets().then((web3) => {
            if(web3 === null){
                this.setState({isLoaded: true});
            }else{
                web3.eth.getAccounts().then(async (acc) => {
                    console.log('Address acccount: ' + acc[0])
                    this.setState({address: acc[0],isWebEnabled: true });
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
                    .then((data) => {
                        if(data == null){
                            this.setState({
                                isLoaded: true,
                                error: "Empty response"
                            });
                            return
                        }
                        this.setState({
                            isLoaded: true,
                            metadata: data.metadata
                        });
                    },(error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    });
                }, (error) => alert("err while connecting "+ error));
            }
        });
    }

    mintPopUp(){
        this.setState({showUserForm: true});
    }

    mintPopToggle(val){
        this.setState({showUserFrom: val});
    }

    render(){
        const { error, isLoaded, isWebEnabled } = this.state;
        if (error) {
            return (
                <ResponsiveContainer>
                    <Segment style={{minHeight: 800}}>
                        <Header>No NFTs. Mint Some Now!!</Header>
                    </Segment>
                    <Footer/>
                </ResponsiveContainer>)
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
            if(!isWebEnabled){
                return(
                <ResponsiveContainer>
                    <Container style={{minHeight: 500}}>
                    <Message>
                        <Message.Header>No Web3 injected - Please install a Crypto Wallet.</Message.Header>
                        <p>
                        You need to install any crypto wallet, where your created NFT/Art will be stored, to continue. <br/>
                        If you are unfamiliar with crypto wallets, you can <a href="https://metamask.io/">Click here</a> to install most used wallet - <a href="https://metamask.io/">Metamask.</a>
                        </p>
                    </Message>
                    </Container>
                    <Footer/>
                </ResponsiveContainer>)
            }else{
            return (
                <ResponsiveContainer>
                    <Container textAlign='center'>
                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular centered />
                        <Header>{this.state.address}</Header>
                    </Container>
                    <Divider/>
                    <Container textAlign='center'>
                        <CustomCard metadata={this.state.metadata}/>
                    </Container>
                    <Footer/>
                </ResponsiveContainer>
            ); 
            }
        }
    }

}

export default AccountPage;
