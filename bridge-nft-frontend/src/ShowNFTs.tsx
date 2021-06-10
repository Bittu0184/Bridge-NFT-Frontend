import React from "react";

class ShowNFTs extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
      }

      componentDidMount() {
        fetch("http://localhost:8282/get_all_metadata")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                metadata: result.metadata
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
        const { error, isLoaded, metadata } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
              <div>
                <ul>
                {metadata.map((data:any,index:any) => (
                    <li key={index}>
                        <h3>{data.name}</h3>
                        <img src={`https://ipfs.io/ipfs/${data.image}`} alt={data.name} ></img>
                        <p>{data.description}</p>
                    </li>
                ))}
                </ul>
              </div>
            );
        }
      }
}

export default ShowNFTs;