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
import { connectWallets } from "./ConnectWallet";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ExploreTraditionalArt from "./ExploreTraditionalLogin";
import CartPage from "./BuyNowPage";
import Cart from "./Cart";

class CustomNavbar extends React.Component<any,any>{
    constructor(props){
      super(props);
      this.state ={
        address: '',
        loggedIn: false
      }
    }

    async componentDidMount(){
      await connectWallets().then((web3) => {
        web3.eth.getAccounts().then((acc) => {
          this.setState({address: acc[0]});
        })
      }).catch((err) => {
        alert(err);
      });
      //await this.isLoggedIn();
    }

    async isLoggedIn() {
      alert("calling login function");
      await fetch("http://localhost:8282/alreadylogin")
      .then((res) => res.json())
      .then((data) => {
        alert("IS log in "  + data.issuccess);
        this.setState({loggedIn: data.issuccess});
      },(error) => {
        alert("Error" + error);
        this.setState({loggedIn: false});
      });
    }
    
    render() {
        return(
            <Router>
              <Route path="/" exact component={HomepageLayout}/>
              <Route path="/home" exact component={HomepageLayout}/>
              <Route path="/explore" exact component={ShowNFTs}/>
              <Route path="/drop" exact component={AccountPage}/>
              <Route path="/mintnft" ><UploadAndMintHandler address={this.state.address}/></Route>   
              <Route path="/contact" exact component={Contact}/>  
              <Route path="/login" exact component={LoginForm}/>
              <Route path="/signup" exact component={SignupForm}/> 
              <Route path="/exploretraditionalart" exact component={ExploreTraditionalArt}/>    
              <Route path="/buynow" exact component={CartPage}/>   
              <Route path="/cart" exact component={Cart} />        
            </Router>
        );
    }
}

export default CustomNavbar;
