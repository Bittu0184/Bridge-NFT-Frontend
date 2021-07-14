import React from "react";
import UploadNFTForm from "./UploadNFTForm";
import MintNFTForm from "./MintNFTForm";
import SaleNFT from "./SaleNFT";
import {withRouter} from 'react-router';

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
                return <SaleNFT
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                       />
        }
    }
}

export default withRouter(UploadAndMintHandler);