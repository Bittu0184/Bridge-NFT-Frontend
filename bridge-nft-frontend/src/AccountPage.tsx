import React from "react";
import { Card } from "semantic-ui-react";
//import { fetchAPI } from "./CallAPI";
import CustomCard from "./Card";
import { connectWallets } from './ConnectWallet';
import './MintNFT';
import MintNFTPopUp from "./UploadNFTForm";


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
                await fetch("http://localhost:8282/get_metadata_address", {
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
            return <div>Loading...</div>;
        } else {
            return (
                <div>
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
                </div>
            ); 
        }
    }

}

export default AccountPage;
