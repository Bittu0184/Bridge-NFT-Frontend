import React from "react";
import {
    BrowserRouter as Router,
    withRouter,
    Route
  } from "react-router-dom";
import ShowNFTs from "./ShowNFTs";
import './CustomNavbar.css';
import AccountPage from "./AccountPage";
import UploadAndMintHandler from "./UploadAndMintHandler";
import HomepageLayout from "./HomePageLayout";

class CustomNavbar extends React.Component<any,any>{
    render() {
        return(
            <Router>
              <Route path="/" exact component={HomepageLayout} />
              <Route path="/home" exact component={HomepageLayout}/>
              <Route path="/explore" exact component={ShowNFTs}/>
              <Route path="/drop" exact component={AccountPage}/>
              <Route path="/mintnft" exact render={()=>{
                <UploadAndMintHandler address={"0xb42C73351E636C2A2193773Bf9647E2331773294"} /> 
              }}/>                            
            </Router>
        );
    }
}

export default CustomNavbar;
