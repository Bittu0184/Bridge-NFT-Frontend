import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function connectWallets(){ 
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "https://rinkeby.infura.io/v3/5a13ceea0a5a49d5962dfaaeb104a62c" // required
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
}