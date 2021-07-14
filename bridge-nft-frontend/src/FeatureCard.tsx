import React from "react";
import { Card, Image } from "semantic-ui-react";
import styles from './HomePage.module.css';

class FeatureCard extends React.Component<any,any> {
    render() {
        const { data } = this.props;
        return (
            <Card raised link className={styles.cardCustom}>
                <Image size="large" src={data.src} alt={data.alt} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{data.header}</Card.Header>
                    <Card.Meta>{data.metadata}</Card.Meta>
                    <Card.Description>{data.description}</Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default FeatureCard;
