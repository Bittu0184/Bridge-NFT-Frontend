import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Image } from 'semantic-ui-react';

class ArtistCard extends React.Component<any,any>{ 
    render() {
        const { metadata }  = this.props;
        return (
            <Card.Group centered>
            {metadata.map((data:any,index:any) => (
            <Card raised link key={index} as={NavLink} to={{ pathname:'/artist/' + data.name + '/' + data.supplierid}}>
                <Image size="large" src={process.env.REACT_APP_AWS_S3_BASE_URI+ data.profilelocation} alt={data.name} circular />
                <Card.Content>
                    <Card.Header>{data.name}</Card.Header>
                    <Card.Meta>Joined in 2021</Card.Meta>
                    <Card.Description>
                    {data.about}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    From {data.city}, {data.state}, {data.country}
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
        )
    }
}
export default ArtistCard;