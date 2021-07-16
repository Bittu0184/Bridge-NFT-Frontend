import { Component } from "react";
import { Grid } from "semantic-ui-react";
import Footer from "./Footer";
import ResponsiveContainer from "./ResponsiveContainer";

class CartPage extends Component{
    render() {
        return (
            <ResponsiveContainer>
                  <Grid>
                      <Grid.Column>
                        
                      </Grid.Column>
                      <Grid.Column>

                      </Grid.Column>
                  </Grid>
                <Footer />
              </ResponsiveContainer>
        )
    }
}

export default CartPage