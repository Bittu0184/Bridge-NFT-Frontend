import React from "react";

class MintNFT extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            n: '',
            description: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({n: event.target.n});
      }

      handleChangeDescription(event) {
        this.setState({description: event.target.description});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        const postBody = {
            address: "",
            data: this.state.value 
        };
        const requestMetadata = {
            method: 'POST',
            body: JSON.stringify(postBody)
        };
        fetch("http://localhost:8282/mint_nft",requestMetadata)
          .then(
            (result) => {
              alert(result + "NFT MINTED")
            },
            (error) => {
              alert(error)
            }
          )
      }
    
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.n} onChange={this.handleChangeName} />
            </label>
            <label>
              Description:
              <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
            </label>
            <label>
              Image:
              <input type="file"  />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default MintNFT;