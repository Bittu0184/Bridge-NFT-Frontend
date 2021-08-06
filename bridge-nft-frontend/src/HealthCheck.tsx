import { Component } from "react";

class HealthCheck extends Component{
    render(){
        return(
            <h3>Hey there!!! The App is Healthy {process.env.REACT_APP_HEALTHY_MSG}</h3>
        )
    }
}

export default HealthCheck;