import Web3 from "web3";
import Web3Modal from "web3modal";
import MewConnect from "@myetherwallet/mewconnect-web-client";

export async function connectWallets(){     
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
    
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
    });

    const web3 = new Web3(provider);
    //const accounts = await web3.eth.getAccounts();
   // provider.on("accountsChanged", async (accounts: string[]) => {
        //const bal = await web3.eth.getBalance(accounts[0]);
     //   return accounts[0];
     // });
    //const bal = await web3.eth.getBalance(accounts[0]); 

    return web3  ;
    //return accounts[0];
    
    //web3.eth.Contract.call 
   
    
    //console.log("Accounts: ", accounts[0]);
  }