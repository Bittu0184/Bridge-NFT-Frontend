//import logo from './logo.svg';
import './App.css';
import ShowToken from './ShowToken';
import MintNFT from './MintNFT';
import ShowNFTs from './ShowNFTs';

function App() {
  return (
    <div className="App">
      <div> Mint NFT</div>   
      <MintNFT/> 
      <ShowToken />
      <ShowNFTs />
    </div>
  );
}

export default App;
