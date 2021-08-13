import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Image } from 'semantic-ui-react'

class CustomCard extends React.Component<any,any>{
    render() {
        const { metadata }  = this.props;
        
        return (
            <Card.Group centered>
            <Card style={{minWidth: 350,color:'black',marginRight:10, paddingTop:10, paddingBottom:10, marginTop:10, backgroundColor:'#F4F4F4',borderRadius: 20}} raised as={NavLink} to="/drop" activeStyle={{color:'black', textDecoration: 'none'}}>
            <Image width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + 'sellnft.svg' } alt="NFT" bordered centered circular></Image>
                <Card.Content>
                    <Card.Header>Mint your own NFT!!</Card.Header>
                    <Card.Description>
                    Click Here!!
                    </Card.Description>
                </Card.Content>
            </Card>
            {metadata.map((data:any,index:any) => (
            <Card style={{minWidth: 350,color:'black',marginRight:10, paddingTop:10, paddingBottom:10, marginTop:10, backgroundColor:'#F4F4F4',borderRadius: 20}} raised key={index} as={NavLink} to={{
              pathname:"/home",
              productDetail:{...data,FromAllProducts: true},
              }} activeStyle={{color:'black', textDecoration: 'none'}}>
                <Image width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_IPFS_GATEWAY + data.ipfsID} alt={data.name} centered />
                <Card.Content>
                    <Card.Header>{data.name}</Card.Header>
                    <Card.Description>
                    {data.description}
                    </Card.Description>
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
        )
    }
}
export default CustomCard;