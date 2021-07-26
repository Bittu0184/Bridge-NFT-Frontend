import { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";

class Artists extends Component<any,any>{
    render() {
        return (
            <ResponsiveContainer>
                <Segment>
                    <Container style={{minHeight: 500}}>
                        <Header centered as='h1'>Coming Soon</Header>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
            
        )
    }
}

export default Artists;