import React from "react";
import {  Grid } from "semantic-ui-react";
import FeatureCard from "./FeatureCard";

class Features extends React.Component<any,any> {
    render() {
        const data1 = {
            src:'./nft-concept-background.jpg',
            alt:'image not found',
            metadata:'Coming Soon!!',
            header:'BUY ARTS FROM Digital Artist',
            description:'Searching for a place to get essecnce of traditional india and it\'s arts? You can purchase customised arts directly from local artisans.'
        }
        return (
            <Grid container columns={4}>
                <Grid.Column>
                    <FeatureCard data={data1} />
                </Grid.Column>
                <Grid.Column>
                    <FeatureCard data={data1} />
                </Grid.Column>
                <Grid.Column>
                    <FeatureCard data={data1} />
                </Grid.Column>
                <Grid.Column>
                    <FeatureCard data={data1} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default Features;
