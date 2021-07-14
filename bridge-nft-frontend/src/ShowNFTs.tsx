import React from "react";
import CustomCard from "./Card";
//import InfiniteScroll from 'react-infinite-scroller';
import {withRouter} from "react-router";
import ResponsiveContainer from "./ResponsiveContainer";
//import { createMedia } from "@artsy/fresnel";


class ShowNFTs extends React.Component<any,any>{
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
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
              <ResponsiveContainer>
                <CustomCard metadata={this.state.metadata}/>
              </ResponsiveContainer>
            );
        }
      }
}

export default withRouter(ShowNFTs);