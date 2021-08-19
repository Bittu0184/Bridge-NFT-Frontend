import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Container, Dimmer, Loader, Segment, Image, Icon } from "semantic-ui-react";
import ResponsiveContainer from "./ResponsiveContainer";
import Footer from "./Footer";

class Profile extends Component<any,any>{
    render(){
        const { loginWithRedirect, isAuthenticated, isLoading } = this.props.auth0;
        if (isLoading) {
            return (
                <Dimmer inverted active>
                    <Loader size='large'/>
                </Dimmer>
            )
        }else if(isAuthenticated){
            const { user } = this.props.auth0;
            return(
                <ResponsiveContainer>
                <Segment >
                    <Container>
                    <Card centered>
                        <Image src={user.picture} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>
                            <span>{user.nickname}</span>
                        </Card.Meta>
                        <Card.Description>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Icon name='user' />
                        </Card.Content>
                    </Card>
                    </Container>
                </Segment>
                <Footer/>
                </ResponsiveContainer>
            )
            }
        else{
            loginWithRedirect();
        }
    }
}

export default withAuth0(Profile);