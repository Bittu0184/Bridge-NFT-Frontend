import React from "react";
//import { Card, CardDeck } from 'react-bootstrap';
//import './ShowNFTs.css';
import { Card, Icon, Image } from 'semantic-ui-react'
//import InfiniteScroll from 'react-infinite-scroller';

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
              <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
                 {metadata.map((data:any,index:any) => (
                <Card raised link>
                    <Image size="medium" src={`https://ipfs.io/ipfs/${data.ipfsID}`} alt={data.name} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{data.name}</Card.Header>
                      <Card.Meta>Joined in 2016</Card.Meta>
                      <Card.Description>
                      {data.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        10 Friends
                      </a>
                    </Card.Content>
                </Card>
                   ))}
              </Card.Group>
               
            );
        }
      }
}

export default ShowNFTs;