import React from "react";
import axios from 'axios';


class MintNFT extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            image: '',
            n: '',
            description: '',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event:any) {
        this.setState({n: event.target.n});
      }

      handleChangeDescription(event:any) {
        this.setState({description: event.target.description});
      }
    
      handleSubmit(event:any) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state);
        const data = new FormData(event.target);
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
        }
      
        axios.post("http://localhost:8282/upload_IPFS_pinata", data, config)
            .then(response => {
                alert("Success: " + response + "Address: " + this.props.addressToMint);
                const postBody = {
                  address: this.props.addressToMint,
                  data: response.data['IpfsHash']
                };
                const requestMetadata = {
                  method: 'POST',
                  body: JSON.stringify(postBody)
                };
                axios.post("",requestMetadata,null)
                  .then(resp => {
                    alert("Mint Success: " + resp);
                  })
                  .catch(err => {
                    alert("Error in minting: " + err);
                  })
            })
            .catch(error => {
                alert("Errorr: " + error + " Address: " + this.props.addressToMint);
            });
      }
    
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={this.state.n} onChange={this.handleChangeName} />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={this.state.description} onChange={this.handleChangeDescription} />
              </label>
              <label>
                Image:
                <input type="file" name="fileToUpload"/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        );
      }
}
export default MintNFT;

