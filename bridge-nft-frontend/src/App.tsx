//import logo from './logo.svg';
import './App.css';
import ShowToken from './ShowToken';
import MintNFT from './MintNFT';
import ShowNFTs from './ShowNFTs';
import AddWallets from './AddWallet';

function App() {
  return (
    <div className="App">
      <div> Mint NFT</div>   
      <MintNFT/> 
      <ShowToken />
      <ShowNFTs />
      <AddWallets />
    </div>
  );
}

export default App;
