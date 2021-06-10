import React from "react";

class ShowToken extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tokens: []
        };
      }

      componentDidMount() {
        fetch("http://localhost:8282/get_all_tokenuri")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                tokens: result.tokens
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
    
      render() {
        const { error, isLoaded, tokens } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
              <div>
                <ul>
                {tokens.map( (token:any) => (
                    <li key={token.Id}>
                    <img src={`https://ipfs.io/ipfs/${token.token}`} alt={token.token} ></img>
                    </li>
                ))}
                </ul>
              </div>
            );
        }
      }
}

export default ShowToken;