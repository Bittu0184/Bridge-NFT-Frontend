import React from "react";
import axios from 'axios';
import { Form } from "react-bootstrap";
import './MintNFT.css';

class MintNFT extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            image: '',
            n: '',
            description: '',
            ipfsHash: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMint = this.handleMint.bind(this);
      }
    
      handleChangeName(event:any) {
        this.setState({n: event.target.n});
      }

      handleChangeDescription(event:any) {
        this.setState({description: event.target.description});
      }
    
      handleSubmit(event:any) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.n);
        const data = new FormData(event.target);
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        axios.post("http://localhost:8282/upload_IPFS_pinata", data, config)
            .then(response => {
                alert("Success: " + response + "Address: " + this.props.addressToMint);
                alert("Hash Generated: " + response.data['IpfsHash']);
                this.setState({ipfsHash: response.data['IpfsHash']});
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.props.addressToMint);
            });
      }

      handleMint(e){
        alert("Uploading this: " + this.state.ipfsHash + "To  Address: " + this.props.addressToMint);
        e.preventDefault();
        const postBody = {
          address: this.props.addressToMint,
          datatomint: this.state.ipfsHash
        };
        const strPost = JSON.stringify(postBody);
        alert(strPost)

        fetch('http://localhost:8282/mint_nft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

/*
        const requestMetadata = {
          method: 'POST',
          data: JSON.stringify(postBody)
        };
        const config = {     
          headers: { 'Content-Type': 'application/json' }
        }
        axios.post("http://localhost:8282/mint_nft", requestMetadata, config)
          .then(resp => {
            alert("Mint Success: " + resp.data);
          })
          .catch(err => {
            alert("Error in minting: " + err);
          })*/
      }
    
      render() {
        return (
          <div>
            <div className="text-center w-60 d-flex align-items-center justify-content-center container">
              <form onSubmit={this.handleSubmit}> 
                <Form.Group controlId="formBasicName">
                  <Form.Label>NFT Name:</Form.Label>
                  <Form.Control type="text" name="name" value={this.state.n} onChange={this.handleChangeName} placeholder="Enter name for NFT." />
                  <Form.Text className="text-muted">
                    This name will be stored on IPFS.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>NFT Description:</Form.Label>
                  <Form.Control type="text-area" name="description" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Enter description for NFT." />
                  <Form.Text className="text-muted">
                    This Description will be stored on IPFS.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.File id="formControlFile" label="File To Mint" name="fileToUpload"/>
                </Form.Group>
                <input type="submit" value="Submit"/>
              </form>
            </div>
            <button onClick={this.handleMint}>Mint Uploaded Art</button>
          </div>
        );
      }
}
export default MintNFT;

