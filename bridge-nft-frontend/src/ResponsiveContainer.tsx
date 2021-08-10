import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Component } from 'react'
import {
  Button,
  Container,
  Image,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import LoginButton from './LoginButton';
import logo from './logo.svg';



const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component<any,any> {
  state = {
    fixed: false
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
    static propTypes: { children: PropTypes.Requireable<PropTypes.ReactNodeLike> }

  render() {
    const { children } = this.props
    const { fixed } = this.state
   // const { isLog } = this.props
    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment

            textAlign='center'
            style={{ minHeight: 90, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Menu.Item>
                  <Image src={logo} alt='logo' size='tiny'/>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/home">
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} to="/home">Digital Art - NFT</Menu.Item>
                <Menu.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Menu.Item>
                <Menu.Item as={NavLink} to="/artists">Artists</Menu.Item>
                <Menu.Item as={NavLink} to="/drop">Connect</Menu.Item>
                <Menu.Item position='right'>
                  <LoginButton fix={fixed}/>
                  <Button  as={NavLink} to="/cart" icon><Icon name='shop'/></Button>
                </Menu.Item>  
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {
    sidebarOpened: false
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })
    static propTypes: { children: PropTypes.Requireable<PropTypes.ReactNodeLike> }

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media  at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item>
            <Image src={logo} alt='logo' size='tiny'/>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/home" active>
              Home
            </Menu.Item>
            <Menu.Item as={NavLink} to="/home">Digital Art - NFT</Menu.Item>
            <Menu.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Menu.Item>
            <Menu.Item as={NavLink} to="/artists">Artists</Menu.Item>
            <Menu.Item as={NavLink} to="/drop">Connect</Menu.Item>
            <Menu.Item><LoginButton fix='false'/></Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 90, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <LoginButton fix='false'/>
                    <Button as={NavLink} to="/cart"  icon><Icon name='shop'/></Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;