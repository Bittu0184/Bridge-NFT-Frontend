import React from "react";
import { Button, Card, Image, Container, Icon, Header, Dimmer, Loader } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';
import { NavLink } from "react-router-dom";
import configData from './Config.json';

class CustomCardTraditionalArt extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            TotalItem: 0,
            supplier: [],
            supplierName:'',
            supplierImage:'',
            error: null
        }
        this.updateSupplierDetail = this.updateSupplierDetail.bind(this);
    }
    updateSupplierDetail(supid){
        console.log("Inside update")
        const supidint = parseInt(supid)
        console.log("supid " + supidint + " Eng " + supid)
        const {supplier} = this.state;
        this.setState({
            supplierName: supplier[supidint].name,
            supplierImage: supplier[supidint].profilelocation
        });
    }
    async componentDidMount(){
        await fetch(process.env.REACT_APP_API_BASE_URI + configData.apiGetAllArtist)
          .then(res => res.json())
          .then( (result) => {
              console.log("REsult " + result[0].name);
              this.setState({
                isLoaded: true,
                supplier: result
              });
            },(err) => {
              this.setState({
                isLoaded: true,
                error: err
              });
              console.log("Error " + err.message);
            }
          );
          console.log("supplier name " + this.state.supplier[0].name);
        }
    render() {
        const { metadata }  = this.props;
        const { error, isLoaded } = this.state;
        if (error) {
            console.log("Error " + error.message);
            return (
                <Header as='h1'>Fail To Connect To server: {error.message}</Header>
            )
        } else if (!isLoaded) {
          console.log("waiting")
            return   (
                <Dimmer inverted active>
                    <Loader size='massive'/>
                </Dimmer>  
            )
        }else{
            const { supplier } = this.state;
        return (
            
            <Card.Group>
            {metadata.map((data:any,index:any) => (
            <Card style={{minWidth: 320,color:'black',marginRight:10, paddingTop:10, paddingBottom:10, marginTop:10, backgroundColor:'#F4F4F4',borderRadius: 20}} raised key={data.productid} as={NavLink} to={{
              pathname:"/buynow",
              productDetail:{...data,FromAllProducts: true},
              }} activeStyle={{color:'black', textDecoration: 'none'}}>
                
                <Image width="300" height="300" style={{borderRadius: 20}} src={process.env.REACT_APP_AWS_S3_BASE_URI + data.imagelocation.split(',')[0]} alt={data.productname} bordered centered/>
                <Card.Content>
                    <Image
                    floated='left'
                    size='mini'
                    circular
                    src={process.env.REACT_APP_AWS_S3_BASE_URI + supplier[data.supplierid - 1].profilelocation}
                    />
                    <Card.Header>{data.productname}</Card.Header>
                    <Card.Meta>{supplier[data.supplierid - 1].name}</Card.Meta>
                    <Card.Description>
                        <Icon name='rupee'/>{data.price}
                    </Card.Description>
                    <Card.Description>{data.productdesc.substring(0,30)}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Container textAlign='center'>
                        <Button.Group>
                            <Button content='Coming Soon!!'  size='medium' >
                            </Button>
                        </Button.Group>
                    </Container> 
                </Card.Content>
            </Card>
            ))}
            </Card.Group>
        )}
    }
}
export default withAuth0(CustomCardTraditionalArt);
//<div>{this.updateSupplierDetail.call(this,data.supplierid)}</div>