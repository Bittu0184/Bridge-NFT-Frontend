import React from "react";
import { Icon, Item} from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import {  Redirect } from "react-router-dom";


class EditProduct extends React.Component<any,any>{
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
        const { productDetail }  = this.props.location;
        if(productDetail.FromAllProducts !== true){
            return (
                <Redirect to="/artistpanel"/>
            )
        }
       else{
        return (
                <Item>
                <Item.Image  width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + productDetail.imagelocation.split(',')[0]} alt={productDetail.productname}/>
                <Item.Content>
                    <Item.Header>{productDetail.productname}</Item.Header>
                    <Item.Meta>
                    <Icon name='rupee'/>{productDetail.price}
                    </Item.Meta>
                    <Item.Description>{productDetail.productdesc}</Item.Description>
                </Item.Content>
                </Item>
        )}
    }
}
export default withAuth0(EditProduct);
