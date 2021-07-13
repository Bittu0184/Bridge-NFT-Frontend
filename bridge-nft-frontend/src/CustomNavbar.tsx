import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import ShowNFTs from "./ShowNFTs";
import './CustomNavbar.css';
import AccountPage from "./AccountPage";
import UploadAndMintHandler from "./UploadAndMintHandler";
//import Home from "./Home";
import HomePage from "./HomePage";

class CustomNavbar extends React.Component<any,any>{
    render() {
        return(
            <Router>
                <div >
                    <Navbar id="navbar-custom-css" collapseOnSelect  bg="light" variant="light" sticky="top"> 
                        <Navbar.Brand>Unfold Innovates!!</Navbar.Brand>
                        <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav>
                              <Nav.Link href="/home">Home</Nav.Link>
                          </Nav>
                          <Nav className="mr-auto">
                              <Nav.Link href="/explore">Explore</Nav.Link>
                          </Nav>
                          <Nav>
                              <Nav.Link href="/drop">Connect and Create Your own NFT!!</Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/home">
                          <HomePage/>
                        </Route>
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