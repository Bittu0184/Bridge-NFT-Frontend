import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
//import {Button} from 'semantic-ui-react';
//import AddWallets from "./AddWallet";
import ShowNFTs from "./ShowNFTs";
//import MintNFT from "./MintNFT";
//import Web3 from "web3";
//import Web3Modal from "web3modal";
//import MewConnect from "@myetherwallet/mewconnect-web-client";
import './CustomNavbar.css';
import AccountPage from "./AccountPage";
import UploadAndMintHandler from "./UploadAndMintHandler";


class CustomNavbar extends React.Component<any,any>{
    render() {
        return(
            <Router>
                <div >
                    <Navbar collapseOnSelect  bg="light" variant="light" sticky="top"> 
                        <Navbar.Brand>Unfold Innovates!!</Navbar.Brand>
                        <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav className="mr-auto">
                              <Nav.Link href="/explore">Explore</Nav.Link>
                          </Nav>
                          <Nav>
                              <Nav.Link href="/drop">Connect and Create Your own NFT!!</Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/explore">
                          <ShowNFTs />
                        </Route>
                        <Route path="/drop">
                          <AccountPage />
                        </Route>
                        <Route path="/mintnft">
                          <UploadAndMintHandler address={"0xb42C73351E636C2A2193773Bf9647E2331773294"} />  
                        </Route>
                    </Switch>
                </div>                
            </Router>
        );
    }
}

export default CustomNavbar;