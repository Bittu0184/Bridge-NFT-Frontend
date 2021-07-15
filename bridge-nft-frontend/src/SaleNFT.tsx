import React from "react";
import CustomSteps from "./CustomSteps";
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


class SaleNFT extends React.Component<any,any> {
    render(){
        return(
            <Segment style={{minHeight: 500}}>
                <Container textAlign='center'>
                    <Header as='h1'>This feature is Coming Soon!!</Header>
                    <Header as='h4'>Your Block is getting added and verified. 
                    <br /> You need to wait for 2 to 3 minutes to get your nft show up in your collection.</Header>
                    <br />
                    <Header as='h4'>If you want to put your nft on sale now you can upload this on any market place with your address.</Header>
                    <Button size='huge' as={NavLink} to='/drop'>Go To My NFT Collection</Button>
                    <CustomSteps 
                        active="Put For Sale"
                        completed="false"
                    />
                </Container>
                
            </Segment>
            
        )
    }
}

export default SaleNFT;