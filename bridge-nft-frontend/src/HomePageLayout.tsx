import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import buylocal from './Assets/buylocal.jpg';
import buynft from './Assets/buynft.png';
import uploadart from './Assets/uploadart.png';
import Footer from './Footer'

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
    <Header
      as='h1'
      content='UNFOLD INNOVATES'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='UNFOLDING ONLINE PLATFORM FOR DIGITAL AND TRADITIONAL ARTS!!'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
  state = {
    fixed: false
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
    static propTypes: { children: PropTypes.Requireable<PropTypes.ReactNodeLike> }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={NavLink} to="/home" active>
                  Home
                </Menu.Item>
                <Dropdown item text='Explore'>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/explore">Digital Art - NFT</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Dropdown.Item>
                    <Dropdown.Item>Artists</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as={NavLink} to="/drop">Connect</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={NavLink} to="/login" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as={NavLink} to="/signup" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
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
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={NavLink} to="/home" active>
              Home
            </Menu.Item>
            <Menu.Item as={NavLink} to="/explore">Digital Art - NFT</Menu.Item>
            <Menu.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Menu.Item>
            <Menu.Item >Artists</Menu.Item>
            <Menu.Item as={NavLink} to="/drop">Connect</Menu.Item>
            <Menu.Item as={NavLink} to="/login">Log in</Menu.Item>
            <Menu.Item aas={NavLink} to="/signup">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as={NavLink} to="/login" inverted>
                      Log in
                    </Button>
                    <Button as={NavLink} to="/signup" inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
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

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row >
            <Grid.Column width={7}>
              <Container textAlign='center'>
                <Header as='h3' style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                BUY ARTS FROM LOCAL ARTISANS
                </Header>
                <Image bordered rounded size='large' src={buylocal} centered />
                <p style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                We can give you access to wide range of Indian Traditional art from across the country. You can even customise and contact the artist directly.
                </p>
              </Container> 
            </Grid.Column>
            <Grid.Column floated='right' width={7}>
              <Container as={NavLink} to='/drop'  textAlign='center'>
              <Header as='h3' style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                MINT YOUR DIGITAL ART AND PUT FOR SALE
                </Header>
                <Image bordered rounded size='large' src={buynft} centered />
                <p style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                Are you confused about how to get your digital art up for sale? Contact us, we provide platform to mint i.e. store your art on blockchain so you can sell it or store it for eternity.</p>
              </Container>
             </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={7}>
                <Container textAlign='center'>
                <Header as='h3' style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                PUT YOUR ARTWROK FOR SALE
                </Header>
                <Image bordered rounded size='large' src={uploadart} centered />
                <p style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                You can put your traditional or digital artwork on sale. You get exciting benefits on other artworks when you put your art on sale. </p>
                </Container>
            </Grid.Column>
            <Grid.Column floated='right' width={7}>
                <Container textAlign='center'>
                <Header as='h3' style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                CONNECTING ARTISTS AND ARCHITECTS
                </Header>
                <Image bordered rounded size='large' src={buylocal} centered />
                <p style={{ fontFamily:'Source Sans Pro', fontSize: '16px', padding: '2em 0em' }}>
                Connecting local artists with architects to create new experiences for the customers/companies. 
                </p>
                </Container>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container textAlign='center' text>
        <Header as='h3' style={{ fontSize: '2em' }}>
        EMPOWERING ART AND ARTIST OF INDIA
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        Our goal is to make sure to give local artists whether digital or traditional a platform to showcase their art.
        We value your growth!
        </p>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
        100% PROTECTION
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        Your digital art remains protected with our cutting edge blockchain technology. 
        <br/>
        Your traditional art is handled with utmost care.</p>
        <Button as='a' size='massive'>
          I'm Quite Interested. Subscribe!
        </Button>
      </Container>
    </Segment>
    <Footer />
  </ResponsiveContainer>
)

export default withRouter(HomepageLayout);