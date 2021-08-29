import { Component } from "react";
import { Container, Dimmer, Feed, Grid, Icon, Image, Loader, Message, Segment } from "semantic-ui-react";
import Footer from "../Footer";
import ResponsiveContainer from "../ResponsiveContainer";
import configData from '../Config.json';
import { NavLink } from "react-router-dom";
import {Helmet} from 'react-helmet';

class Blog extends Component<any,any>{
    constructor(props:any){
        super(props)
        this.state = {
            isLoaded: false,
            data: [],
            error:null
        }
    }

    async componentDidMount(){
        await fetch(process.env.REACT_APP_API_BASE_URI + configData.apiBlog)
        .then((res) => res.json())
        .then((result) => {
            console.log(JSON.stringify(result))
            this.setState({isLoaded: true,data: result})
        },(err) => {
            this.setState({isLoaded:true,error:err})
        })
    }

    render(){
        const {error, isLoaded, data} = this.state;
        if(error){
            return(
            <ResponsiveContainer>
                <Helmet>
                <title>Traditional Art and NFT - Digital Art on Ethereum blockchain</title>
                <meta name="description" content="Unfold the digital - NFT and traditional art of India. Unfolding the trasure of traditaionl art along with digital art - NFT. Connect with artist and architects from all around India." />
                </Helmet>
                <Container>
                <Message>We are facing some issues.Please try later.</Message>
                </Container>
                <Footer/>
            </ResponsiveContainer>
            )
        }else if(!isLoaded){
            return(
            <Dimmer>
                <Helmet>
                <title>Traditional Art and NFT - Digital Art on Ethereum blockchain</title>
                <meta name="description" content="Unfold the digital - NFT and traditional art of India. Unfolding the trasure of traditaionl art along with digital art - NFT. Connect with artist and architects from all around India." />
                </Helmet>
                <Loader size='massive'/>
            </Dimmer>)
        }else{
        return(
            <ResponsiveContainer>
                <Helmet>
                <title>Traditional Art and NFT - Digital Art on Ethereum blockchain</title>
                <meta name="description" content="Unfold the digital - NFT and traditional art of India. Unfolding the trasure of traditaionl art along with digital art - NFT. Connect with artist and architects from all around India." />
                </Helmet>
                <Segment style={{paddingTop: 70}}>
                    <Container text style={{minHeight: 450}}>
                        <Grid>
                            <Grid.Row>
                            <Feed size='large'>
                                {data.map( (da:any,index:any) => (
                                     <Feed.Event key={index}>
                                     <Feed.Label>
                                         <Image src={process.env.REACT_APP_AWS_S3_BASE_URI + da.piclocation} />
                                     </Feed.Label>
                                     <Feed.Content>
                                         <Feed.Summary>
                                         <Feed.User as={NavLink} to={{pathname:"/full/blog",blog:{...da}}}>{da.name}</Feed.User> 
                                         <Feed.Date>{da.datetime}</Feed.Date>
                                         </Feed.Summary>
                                         <Feed.Meta>
                                         <Feed.User>{da.author}</Feed.User>
                                         <Feed.Like>
                                            <Icon name='like' />{da.likes} likes
                                        </Feed.Like>
                                         </Feed.Meta>
                                     </Feed.Content>
                                     </Feed.Event>
                                ))}
                            </Feed>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        )}
    }
}

export default Blog;