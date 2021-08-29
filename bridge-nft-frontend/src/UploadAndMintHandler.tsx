import React from "react";
import UploadNFTForm from "./UploadNFTForm";
import MintNFTForm from "./MintNFTForm";
import SaleNFT from "./SaleNFT";
import {withRouter} from 'react-router';
import ResponsiveContainer from "./ResponsiveContainer";
import Footer from "./Footer";
import { connectWallets } from "./ConnectWallet";

class UploadAndMintHandler extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            step: 1,
            image: '',
            n: '',
            description: '',
            ipfsHash: '',
            address: "",
            completed: 0
        };
        this.updateIPFSHash = this.updateIPFSHash.bind(this);
    }

    async componentDidMount(){
        await connectWallets().then((web3) => {
          web3.eth.getAccounts().then((acc) => {
            this.setState({address: acc[0]});
          })
        }).catch((err) => {
          alert(err);
        });
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
    
    render(){
        const {step} = this.state;
        const {image,n,description,ipfsHash,address,completed} = this.state;
        const values  = {image,n,description,ipfsHash,address,completed};
        switch(step) {
            case 1:
                return  (
                    <ResponsiveContainer>
                        <UploadNFTForm
                        nextStep={this.nextStep}
                        handleChange = {this.handleChange}
                        values={values}
                        updateIPFSHash={this.updateIPFSHash}
                        />
                        <Footer/>
                    </ResponsiveContainer>
                )
            case 2:
                return  (
                    <ResponsiveContainer>
                        <MintNFTForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        values={values}    
                        /> 
                        <Footer/>
                    </ResponsiveContainer>)
            case 3:
                return (
                    <ResponsiveContainer>
                        <SaleNFT
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                       />
                       <Footer/>
                    </ResponsiveContainer>)
        }
    }
}

export default withRouter(UploadAndMintHandler);