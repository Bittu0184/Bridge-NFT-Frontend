import React from "react";
import axios from 'axios';
import CustomSteps from "./CustomSteps";

class SaleNFT extends React.Component<any,any> {

    componentDidMount(){
        axios.get("https://gateway.pinata.cloud/ipfs/" + this.props.values.ipfsHash)
            .then((res) => res.data)
            .then((data) => {
                console.log("IPFS ID : " + data.ipfsID);
                this.setState({imageIPFS: data.ipfsID});
            })
            .catch((err) => console.log(err));
        console.log("Image URL" + this.state.imageIPFS);
    }
    
    render(){
        return(
            <div>
                <p>Coming Soon!!</p>
                <CustomSteps 
                    active="Put For Sale"
                    completed="false"
                />
            </div>
            
        )
    }
}

export default SaleNFT;