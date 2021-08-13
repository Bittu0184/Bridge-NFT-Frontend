import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function connectWallets(){ 
  if (typeof window.web3 !== 'undefined') {
    console.log('web3 is enabled')
    if (window.web3.currentProvider.isMetaMask === true) {
      console.log('MetaMask is active')
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: process.env.REACT_APP_RINKEBY_INFURA_ID // required
          }
        }
      };
      const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
      
      const provider = await web3Modal.connect();
      
      const web3 = new Web3(provider);
      return web3;
    } else {
      console.log('MetaMask is not available');
      return null;
    }
  } else {
    console.log('web3 is not found');
    return null;
  }
  
}