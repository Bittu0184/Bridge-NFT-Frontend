import {Component } from 'react'
import {  Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { fetchAPI } from './CallAPI'
import CustomCard from './Card'
import CustomCardTraditionalArt from './CustomCardTraditionalArt'
import Footer from './Footer'
import ResponsiveContainer from './ResponsiveContainer'
import './ShowNFTs.css'
class ExploreTraditionalArt extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: []
        };
      }

      componentDidMount() {
        fetch("http://localhost:8282/get_all_metadata")
          .then(res => res.json())
          .then( (result) => {
              this.setState({
                isLoaded: true,
                metadata: result.metadata
              });
              console.log(this.state.metadata);
            },(error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return (
            <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <div> OOPS!! Error: {error.message}</div>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else if (!isLoaded) {
            return   (  
              <ResponsiveContainer>
                <Segment style={{minHeight: 800, marginTop: 50}}>
                  <Dimmer active>
                    <Loader size='massive'/>
                  </Dimmer>
                </Segment>
                <Footer/>
              </ResponsiveContainer>
            )
        } else {
            return (
              <ResponsiveContainer>
                  <Container className="customContainer">
                  <CustomCardTraditionalArt metadata={this.state.metadata}/>
                  </Container>
                <Footer />
              </ResponsiveContainer>
            );
        }
    }
}

export default ExploreTraditionalArt