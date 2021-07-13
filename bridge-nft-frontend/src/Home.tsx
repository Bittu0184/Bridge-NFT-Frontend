import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
//import ShowNFTs from "./ShowNFTs";
import './CustomNavbar.css';
import AccountPage from "./AccountPage";
import UploadAndMintHandler from "./UploadAndMintHandler";
import HomePage from "./HomePage";


class Home extends React.Component<any,any>{
    render() {
        return(
            <Router>
                <div >
                    <Navbar id="navbar-custom-css" collapseOnSelect  bg="light" variant="light" sticky="top"> 
                        <Navbar.Brand>Unfold</Navbar.Brand>
                        <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav>
                              <Nav.Link href="/explore">Explore</Nav.Link>
                          </Nav>
                          <Nav>
                              <Nav.Link href="/drop">Connect</Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/explore">
                          <HomePage />
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

export default Home;