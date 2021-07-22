import { Component } from "react";
import { Card, Container, Grid, Segment, Image, Header, Icon, Button, Divider } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";
import uploadart from './Assets/uploadart.png';
import { Redirect } from "react-router-dom";
class CartPage extends Component<any,any>{
    render() {
        const { state } = this.props.location;
        console.log("In Cart " + state);
        if(state === undefined){
            return(
            <Redirect to="/home" />
            )
        }
        const {productDetail} = state;
        return (
            <ResponsiveContainer>
                  <Grid  centered style={{marginTop: 30,marginBottom: 30}}>
                      <Grid.Column width={6}>
                        <Segment>
                            <Container >
                                <Card  >
                                    <Image fluid src={uploadart} style={{minHeight: 400}} wrapped ui={false}/>
                                </Card>
                            </Container>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Segment>
                            <Container>
                                <Container >
                                    <Header>Name: {productDetail.productname} <br/> By Artist: Artist name </Header>
                                    <Header><Icon name='rupee'/>{productDetail.price}</Header>
                                    <Header as='h4'>{productDetail.productdesc} <br />All orders are insured for transit<br/> We ship Worldwide</Header>
                                    <Button fluid size='huge'>Purchase</Button>
                                </Container>
                                <Divider/>
                                <Container>
                                    <Header as='h4'><Icon name='mail' />Request more Information </Header>
                                    <Header as='h3'>Other Details: <br/> Size: 22X22 <br/> Year: 2019 <br/> Material: XXXXX</Header>
                                </Container>
                            </Container>
                        </Segment>
                      </Grid.Column>
                  </Grid>
                <Footer />
              </ResponsiveContainer>
        )
    }
}

export default CartPage