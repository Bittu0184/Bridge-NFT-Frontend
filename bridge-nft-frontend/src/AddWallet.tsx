/*import React from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import MewConnect from "@myetherwallet/mewconnect-web-client";

class AddWallets extends React.Component<any,any>{
  constructor(props:any) {
    super(props);
    this.state = {
      account: [],
      balance: ''
    };

    // This binding is necessary to make `this` work in the callback
    this.connectWallets = this.connectWallets.bind(this);
  }

  async connectWallets(){     
    const providerOptions = {
      mewconnect: {
        package: MewConnect, // required
        options: {
          infuraId: "https://rinkeby.infura.io/v3/5a13ceea0a5a49d5962dfaaeb104a62c" // required
        }
      }
    };
    
    
    const web3Modal = new Web3Modal({
      network: "rinkbey", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    

    const provider = await web3Modal.connect();
    
    const web3 = new Web3(provider);
    
    const accounts = await web3.eth.getAccounts();
    const bal = await web3.eth.getBalance(accounts[0]); 
    this.setState({
      account: accounts,
      balance: bal
    }); 
   
    provider.on("accountsChanged", async (accounts: string[]) => {
      const bal = await web3.eth.getBalance(accounts[0]);
      this.setState({
        account: accounts,
        balance: bal
      });
    });
    //console.log("Accounts: ", accounts[0]);
  }

  render() {
    return (
      <div>
        <button onClick={this.connectWallets}>
          Connect Wallet
        </button>
        <h2>Account Address: {this.state.account}</h2>
        <h3>Account Balance: {this.state.balance}</h3>
      </div>
    )}
}
export default AddWallets;*/
export {};