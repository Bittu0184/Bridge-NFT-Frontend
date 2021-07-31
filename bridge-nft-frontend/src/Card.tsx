import React from "react";
import { Card, Container, Icon, Image } from 'semantic-ui-react'

class CustomCard extends React.Component<any,any>{
    render() {
        const { metadata }  = this.props;
        
        return (
            <Container>
            <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
            {metadata.map((data:any,index:any) => (
            <Card raised link key={index}>
                <Image size="large" src={`https://gateway.pinata.cloud/ipfs/${data.ipfsID}`} alt={data.name} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{data.name}</Card.Header>
                    <Card.Meta>Joined in 2016</Card.Meta>
                    <Card.Description>
                    {data.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a href="/">    
                    <Icon name='like' />
                    </a>
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
            </Container>
        )
    }
}
export default CustomCard;