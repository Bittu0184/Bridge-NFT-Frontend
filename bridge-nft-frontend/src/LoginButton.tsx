import { Component  } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Dimmer, Dropdown, DropdownItem, Icon, Loader, Menu } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

class LoginButton extends Component<any,any>{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.navCustom = this.navCustom.bind(this);
        this.navConnect = this.navConnect.bind(this);
    }

    navConnect(){
      return (
        <DropdownItem as={NavLink} to="/drop">Connect - Digital Art</DropdownItem>
        )
    }

    navCustom() {
        return (
            <DropdownItem as={NavLink} to="/profile">Profile</DropdownItem>
        )
    }
    
    handleLogout() {
        const {logout} = this.props.auth0;
        logout({ returnTo: window.location.origin });
    }

    
    render () {
        const { loginWithRedirect, isAuthenticated, isLoading } = this.props.auth0;
        if (isLoading) {
            return (
                <Dimmer active>
                    <Loader size='medium'/>
                </Dimmer>
            )
        }
        if(isAuthenticated){
            const { user } = this.props.auth0;
            const trigger = (
                <span>
                  <Icon name='user' /> Hello, {user.name} 
                </span>
              )
              
              const options = [
                {
                  key: 'user',
                  text: (
                    <span>
                      Signed in as <strong>{user.name}</strong>
                    </span>
                  ),
                  disabled: true,
                },
                { key: 'profile', as:this.navCustom },
                { key: 'Connect - Digital Art', as:this.navConnect },
                { key: 'sign-out', text: 'Log Out' , onClick: this.handleLogout  },
              ]
              
              const DropdownTriggerExample = () => (
                <Dropdown trigger={trigger} options={options} />
              )            
            return (
                    <DropdownTriggerExample/>
            )
        }else {
            const {fix} = this.props;
            return (
                <Menu.Item onClick={() => loginWithRedirect()} inverted style={{ marginLeft: '0.5em' }} >Log In</Menu.Item>
            )
        }
        
    }
}

export default withAuth0(LoginButton);