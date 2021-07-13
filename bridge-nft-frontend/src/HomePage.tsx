import React from "react";
import { Container, Image } from "semantic-ui-react";
import Features from "./Features";

class HomePage extends React.Component<any,any> {
    render() {
        
        return (
            <Container>
                  <Image src={'./nft-concept-background.jpg'} fluid />
                  <Features />
            </Container>
        )
    }
}

export default HomePage;
