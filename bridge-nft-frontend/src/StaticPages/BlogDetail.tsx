import { Component } from "react";
import { Container, Dimmer,Image, Grid, Loader, Message, Segment, Header } from "semantic-ui-react";
import Footer from "../Footer";
import ResponsiveContainer from "../ResponsiveContainer";
import configData from '../Config.json';
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
class BlogDetail extends Component<any,any>{
    constructor(props:any){
        super(props)
        this.state = {
            isLoaded: false,
            data: [],
            error:null
        }
    }

    async componentDidMount(){
        const { blog } = this.props.location
        await fetch(process.env.REACT_APP_API_BASE_URI + configData.apiBlogPostDetails + blog.blogid)
        .then((res) => res.json())
        .then((result) => {
            this.setState({isLoaded: true,data: result})
        },(err) => {
            this.setState({isLoaded:true,error:err})
        })
    }

    render(){
        const {error, isLoaded, data} = this.state;
        const { blog } = this.props.location
        if(error){
            return(
            <ResponsiveContainer>
                <Container>
                <Message>We are facing some issues.Please try later.</Message>
                </Container>
                <Footer/>
            </ResponsiveContainer>
            )
        }else if(!isLoaded){
            return(
            <Dimmer>
                <Loader size='massive'/>
            </Dimmer>)
        }else{
        return(
            <ResponsiveContainer>
                <Segment style={{paddingTop: 70}}>
                    <Container text style={{minHeight: 450}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image circular src={process.env.REACT_APP_AWS_S3_BASE_URI + blog.piclocation} />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Header as='h1'>
                                    {blog.name}
                                    <Header.Subheader>{blog.author} {blog.datetime}</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                            <span style={{whiteSpace: 'pre-line'}}> {data.content}</span>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        )}
    }
}

export default BlogDetail;