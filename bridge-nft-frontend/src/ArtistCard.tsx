import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Image } from 'semantic-ui-react';
import configData from './Config.json';

class ArtistCard extends React.Component<any,any>{ 
    render() {
        const { metadata }  = this.props;
        return (
            <Card.Group>
            {metadata.map((data:any,index:any) => (
            <Card raised link key={index} as={NavLink} to={{ pathname:'/sartist', state: { artistdetails: {...data,fromAllArtist: true} } }}>
                <Image size="large" src={configData.awsS3BaseUri + data.profilelocation} alt={data.name} circular />
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