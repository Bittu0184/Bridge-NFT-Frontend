import React from "react";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";
import ShowNFTs from "./ShowNFTs";
import AccountPage from "./AccountPage";
import UploadAndMintHandler from "./UploadAndMintHandler";
import HomepageLayout from "./HomePageLayout";
import Contact from "./Contact";
import ExploreTraditionalArt from "./ExploreTraditionalLogin";
import CartPage from "./BuyNowPage";
import Cart from "./Cart";
import Profile from "./Profile";
import Artists from "./Artists";
import AllArtists from "./AllArtists";

class CustomNavbar extends React.Component<any,any>{
    render() {
        return(
            <Router>
              <Route path="/" exact component={HomepageLayout}/>
              <Route path="/home" exact component={HomepageLayout}/>
              <Route path="/explore" exact component={ShowNFTs}/>
              <Route path="/drop" exact component={AccountPage}/>
              <Route path="/mintnft" exact component={UploadAndMintHandler}/>   
              <Route path="/contact" exact component={Contact}/>  
              <Route path="/exploretraditionalart" exact component={ExploreTraditionalArt}/>    
              <Route path="/buynow" exact component={CartPage}/>   
              <Route path="/cart" exact component={Cart} />      
              <Route path="/profile" exact component={Profile}/>  
              <Route path="/artists" exact component={AllArtists}/>
              <Route path="/artist/:name/:id" exact component={Artists}/>
              <Route path="/about" exact component={HomepageLayout}/>
            </Router>
        );
    }
}
export default CustomNavbar;
