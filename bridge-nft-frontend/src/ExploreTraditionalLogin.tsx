import {Component } from 'react'
import {  Container, Dimmer, Header, Loader, Menu, Placeholder, Segment } from 'semantic-ui-react'
import CustomCardTraditionalArt from './CustomCardTraditionalArt'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import './ShowNFTs.css';
import InfiniteScroll from 'react-infinite-scroll-component'
import configData from './Config.json';
//import { event } from 'react-ga'

class ExploreTraditionalArt extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            metadata: [],
            hasMore: true,
            offset: 0,
            activeItem: 'All',
            hasCategoryChanged: false,
            isLoadedCategory: false
        };
       this.fetchNextLot = this.fetchNextLot.bind(this);
       this.handleItemClick = this.handleItemClick.bind(this);
      }
      fetchNextLot(){
        fetch( `${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtPage + encodeURIComponent(this.state.activeItem) + '/' + encodeURIComponent(10) + '/' + encodeURIComponent(this.state.offset)}`)
        .then(res => res.json())
          .then( (result) => {
              if(result == null){
                this.setState({
                  isLoaded: true,
                  hasMore: false
                });
                return
              }else if(this.state.hasCategoryChanged === true){
                this.setState({
                    isLoaded: true,
                    metadata: result,
                    offset: 10,
                    hasMore: true,
                    hasCategoryChanged: false
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
         fetch( `${process.env.REACT_APP_API_BASE_URI + configData.apiGetArtPage + encodeURIComponent(this.state.activeItem) +'/'  + encodeURIComponent(10) + '/' + encodeURIComponent(0)}`)
          .then(res => res.json())
          .then( (result) => {
            this.setState({
                isLoaded: true,
                metadata: result,
                offset: 10,
                hasMore: true
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          )

          await fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetCategory)
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoadedCategory: true,
                categoryMetadata: result
              });
            },(err) => {
              this.setState({
                isLoadedCategory: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          )
          
      }

    async handleItemClick(name){  
      console.log("Inside handle item");
      this.setState({ activeItem: name, hasMore: true, offset: 0, hasCategoryChanged:true }, ()=>this.fetchNextLot());
    } 
    render() {
        const { error, isLoaded, activeItem, isLoadedCategory, categoryMetadata } = this.state;
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
        } else if (!isLoaded || !isLoadedCategory) {
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
                  <Container>
                  <Menu pointing stackable>
                    {categoryMetadata.map((data,index) => (
                       <Menu.Item
                       name={data.categoryname}
                       active={activeItem === data.categoryname}
                       onClick={() => this.handleItemClick(data.categoryname)}
                      />
                    ))}
                  </Menu>
                  </Container>
                  <Container style={{minHeight: 600}} className="customContainer">
                  <InfiniteScroll
                    dataLength={this.state.metadata.length}
                    next={this.fetchNextLot}
                    hasMore={this.state.hasMore}
                    loader={<Placeholder>
                              <Placeholder.Image square />
                            </Placeholder>
                            }
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