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
import HealthCheck from "./HealthCheck";
import About from "./About";
import RouteChangeTracker from "./RouteChangeTracker";
import TnC from "./TnC";
import AdminPanel from "./ArtistsAdminPages/AdminPanel";
import CaptureOrderDetails from "./PaymentGateway/CaptureOrderDetails";

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
              <Route path="/about" exact component={About}/>
              <Route path="/healthCheck" exact component={HealthCheck}/>
              <Route path="/tnc" exact component={TnC}/>
              <Route path="/artistpanel" exact component={AdminPanel}/>
              <Route path="/orderDetails" exact component={CaptureOrderDetails}/>
              <RouteChangeTracker/>
            </Router>
        );
    }
}
export default CustomNavbar;
