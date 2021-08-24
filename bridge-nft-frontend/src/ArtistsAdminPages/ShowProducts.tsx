import React from "react";
import { Card, Image, Icon, Header, Dimmer, Loader, Message, Item, Button } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import { NavLink } from "react-router-dom";
import configData from '../Config.json';
import EdiText from 'react-editext';


class ShowProducts extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            TotalItem: 0,
            supplier: [],
            supplierName:'',
            supplierImage:'',
            error: null
        }

    }

    render() {
        const { metadata }  = this.props;
        if(metadata == null){
            return (
                <Message>
                    <Message.Header>No Products Added</Message.Header>
                </Message>
            )
        }
       else{
        return (
                <Item.Group divided>
                {metadata.map((data:any,index:any) => (
                 <Item key={index}>
                <Item.Image  width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} alt={data.productname}/>
                <Item.Content>
                    <Item.Header>{data.productname}</Item.Header>
                    <Item.Meta>
                    <Icon name='rupee'/>{data.price}
                    </Item.Meta>
                    <Item.Description>{data.productdesc}</Item.Description>
                    <Item.Extra>
                    <Button icon primary floated='right' as={NavLink} to={{pathname:"/editproduct",productDetail:{...data,FromAllProducts: true}}} >
                        <Icon name='edit' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
                </Item>
                ))}
            </Item.Group>
        )}
    }
}
export default withAuth0(ShowProducts);
