import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Container, Grid, Icon, Image } from 'semantic-ui-react'

class CustomCardTraditionalArt extends React.Component<any,any>{
    render() {
        const { metadata }  = this.props;
        
        return (
            <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
            {metadata.map((data:any,index:any) => (
            <Card raised link>
                <Image size="medium" src={`https://gateway.pinata.cloud/ipfs/${data.ipfsID}`} alt={data.name} rounded fluid bordered wrapped ui={false} />
                <Card.Content>
                    <Container>
                    <Grid>
                            <Grid.Column floated='left' width={6} >
                            <Card.Header>Art Name</Card.Header>
                            <Card.Meta>By Artist-Name</Card.Meta>
                            </Grid.Column>
                            <Grid.Column floated='right' width={8} >
                                <Card.Description left>
                                <Icon name='rupee'/>1000000
                                </Card.Description>
                                <Card.Description left>
                                Peaky Blinder Thomas Shelby product
                                </Card.Description>
                            </Grid.Column>
                    </Grid>
                    </Container>
                    
                </Card.Content>
                
                <Card.Content extra>
                    <Container className='ui buttons'>
                        <Button as={NavLink} to={{ pathname:'/cart', productid: {Id:'hey from card'}  }} fluid size='medium' animated='vertical'>
                        <Button.Content hidden>Buy Now</Button.Content>
                        <Button.Content visible>
                            <Icon name='shop' />
                        </Button.Content>
                        </Button>
                    </Container> 
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
        )
    }
}
export default CustomCardTraditionalArt;