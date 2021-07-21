import { Component  } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Dimmer, Dropdown, DropdownItem, Icon, Loader } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

class LoginButton extends Component<any,any>{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.navCustom = this.navCustom.bind(this);
    }

    navCustom() {
        return (
            <DropdownItem as={NavLink} to="/drop">Profile</DropdownItem>
        )
    }
    
    handleLogout() {
        const {logout} = this.props.auth0;
        logout({ returnTo: window.location.origin });
    }

    handleProfile() {
        this.props.history.push(`/drop`);
    }

    
    render () {
        const { loginWithRedirect, isAuthenticated, isLoading } = this.props.auth0;
        const {fixed} = this.props.fix;
        if (isLoading) {
            return (
                <Dimmer active>
                    <Loader size='large'/>
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
                { key: 'sign-out', text: 'Log Out' , onClick: this.handleLogout  },
              ]
              
              const DropdownTriggerExample = () => (
                <Dropdown trigger={trigger} options={options} />
              )            
            return (
                <DropdownTriggerExample/>
            )
        }else {
            return (
                <Button onClick={() => loginWithRedirect()} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} >Log In</Button>
            )
        }
        
    }
}

export default withAuth0(LoginButton);