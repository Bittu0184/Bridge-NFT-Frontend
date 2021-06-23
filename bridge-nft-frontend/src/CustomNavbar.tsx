import React from "react";
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
//import AddWallets from "./AddWallet";
import ShowNFTs from "./ShowNFTs";
import MintNFT from "./MintNFT";
import Web3 from "web3";
import Web3Modal from "web3modal";
import MewConnect from "@myetherwallet/mewconnect-web-client";

class CustomNavbar extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            address: "",
        };
        this.connectWallets = this.connectWallets.bind(this);
    }

    componentDidMount(){
        this.connectWallets();
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
        //const bal = await web3.eth.getBalance(accounts[0]); 
        this.setState({
            address: accounts
        }) 
        
        //web3.eth.Contract.call 
       
        provider.on("accountsChanged", async (accounts: string[]) => {
          //const bal = await web3.eth.getBalance(accounts[0]);
          this.setState({
            address: accounts
          });
        });
        //console.log("Accounts: ", accounts[0]);
      }
    

    render() {
        return(
            <Router>
                <div>
                    <Navbar bg="light" variant="light" sticky="top"> 
                    <NavbarBrand>Granth Innovates!</NavbarBrand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/explore">Explore</Nav.Link>
                            <Nav.Link href="/drop">Drop</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route path="/explore">
                            <ShowNFTs />
                        </Route>
                        <Route path="/drop">
                            <MintNFT addressToMint={this.state.address}/>
                        </Route>
                    </Switch>
                </div>
                
            </Router>
           
        );
    }
}

export default CustomNavbar;