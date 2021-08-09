import {Component } from 'react'
import {  Container, Dimmer, Header, Loader, Segment } from 'semantic-ui-react'
import CustomCardTraditionalArt from './CustomCardTraditionalArt'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import './ShowNFTs.css';
import configData from './Config.json';
import InfiniteScroll from 'react-infinite-scroll-component'

class ExploreTraditionalArt extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            metadata: [],
            hasMore: true,
            offset: 0
        };
       this.fetchNextLot = this.fetchNextLot.bind(this);
      }
      fetchNextLot(){
        console.log("call fetch " + process.env.REACT_APP_API_BASE_URI + configData.apiGetArtPage + encodeURIComponent(10) + '/' + encodeURIComponent(this.state.offset))
        console.log("limit 10 offset " + this.state.offset);
        fetch( `${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtPage + encodeURIComponent(10) + '/' + encodeURIComponent(this.state.offset)}`)
        .then(res => res.json())
          .then( (result) => {
              if(result == null){
                this.setState({
                  isLoaded: true,
                  hasMore: false
                });
                return
              }
              this.setState(prevState => {
              return {
                isLoaded: true,
                metadata: prevState.metadata.concat(result),
                offset: prevState.offset + 10,
                hasMore: true
              }
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err,
                hasMore: false
              });
              console.log("Error " + err.message);
            }
          )
      }

      async componentDidMount() {
         fetch( `${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtPage + encodeURIComponent(10) + '/' + encodeURIComponent(0)}`)
          .then(res => res.json())
          .then( (result) => {
            this.setState(prevState => {
              return {
                isLoaded: true,
                metadata: result,
                offset: prevState.offset + 10,
                hasMore: true
              }
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          )
      }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            console.log("Error " + error.message);
            return (
              <ResponsiveContainer>
              <Segment style={{minHeight: 800, marginTop: 50}}>
                <Header as='h1'>Fail To Connect To server: {error.message}</Header>
              </Segment>
              <Footer/>
            </ResponsiveContainer>
            )
        } else if (!isLoaded) {
          console.log("waiting")
            return   (  
              <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer inverted active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else {
          console.log("Loaded ")
            return (
              <ResponsiveContainer >
                  <Container style={{minHeight: 500}} className="customContainer">
                  <InfiniteScroll
                    dataLength={this.state.metadata.length}
                    next={this.fetchNextLot}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    <CustomCardTraditionalArt metadata={this.state.metadata}/>
                  </InfiniteScroll>
                  </Container>
                <Footer />
              </ResponsiveContainer>
            );
        }
    }
}

export default ExploreTraditionalArt