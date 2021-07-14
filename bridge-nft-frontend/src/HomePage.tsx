import React from "react";
import { Container, Image } from "semantic-ui-react";
import Features from "./Features";
import styles from './HomePage.module.css'; 

class HomePage extends React.Component<any,any> {
    render() {
        return (
            <Container  className={styles.featureContainer}>
                  <Image src={'./nft-concept-background.jpg'} fluid />
                  <Features/>
            </Container>
        )
    }
}

export default HomePage;
