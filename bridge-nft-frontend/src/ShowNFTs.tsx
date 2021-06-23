import React from "react";
import { Card, CardDeck } from 'react-bootstrap';
import './ShowNFTs.css';

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
                <CardDeck className="CustomCardDeck">
                {metadata.map((data:any,index:any) => (
                  <Card className="CustomCard" key={index} border="dark">
                    <Card.Img className="CustomCardImg" variant="top" src={`https://ipfs.io/ipfs/${data.ipfsID}`} alt={data.name} />
                    <Card.Body className="CustomCardBody">
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Text>
                        {data.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Creator/Owner: X</small>
                    </Card.Footer>
                  </Card>
                ))}
                </CardDeck>
              </div>
            );
        }
      }
}

export default ShowNFTs;