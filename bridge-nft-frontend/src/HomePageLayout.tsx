import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { Component } from 'react'
import {
  Button,
  Card,
  Container,
  Divider,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import mintnft from './Assets/mintAsset.png';
import uploadAsset from './Assets/uploadAsset.png';
import forsale from './Assets/forsaleAsset.png';
import Footer from './Footer';
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
  <Container text >
    
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component{
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
   // alert("From Home page layout " + isLog);
    return (
      <Media greaterThan='mobile' >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            vertical
            style={{minHeight: 700, padding: '1em 0em', backgroundImage: `url(${process.env.REACT_APP_AWS_S3_BASE_URI + "finallandingpage.svg"})`, backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat'}}
          >
            <Menu
              fixed={fixed ? 'top' : null}
              secondary
              size='large'
            >
                <Menu.Item>
                  <Image src={logo} alt='logo' size='tiny'/>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/home">
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} to="/explore">Digital Art - NFT</Menu.Item>
                <Menu.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Menu.Item>
                <Menu.Item as={NavLink} to="/artists">Artists</Menu.Item>
                <Menu.Item  position='right'>
                  <LoginButton fix={fixed}/>
                  <Menu.Item  as={NavLink} to="/cart"  inverted icon><Icon name='shop'/></Menu.Item>
                </Menu.Item>
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
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item>
            <Image src={logo} alt='logo' size='small'/>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/home" active>
              Home
            </Menu.Item>
            <Menu.Item as={NavLink} to="/explore">Digital Art - NFT</Menu.Item>
            <Menu.Item as={NavLink} to="/exploretraditionalart">Traditional Art</Menu.Item>
            <Menu.Item as={NavLink} to="/artists">Artists</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 290, padding: '1em 0em', backgroundImage: `url(${process.env.REACT_APP_AWS_S3_BASE_URI + "landingpagemobile.jpg"})`, backgroundSize: 'contain', backgroundRepeat  : 'no-repeat',backgroundPosition: 'top' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <LoginButton inverted style={{ marginLeft: '0.5em' }} fix='false'/>
                    <Button as={NavLink} to="/cart" inverted icon><Icon name='shop'/></Button>
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
    <Segment vertical style={{marginTop: 30, marginBottom:30, paddingTop:30, paddingBottom:30}} textAlign='center'>
      <Card.Group centered style={{marginTop: 30, marginBottom:30, paddingTop:30, paddingBottom:30}} >
          <Card link raised style={{minWidth: 400, Height:400,marginRight:50, marginLeft: 50, marginBottom:100, textDecoration: 'none', color: 'black'}} as={NavLink} to="/exploretraditionalart">
            <Image src={(process.env.REACT_APP_AWS_S3_BASE_URI + 'buylocal.svg')} alt="Unavailable" width="400" height="350"/>
            <Card.Content>
            <Card.Header>
            BUY ARTS FROM LOCAL ARTISANS
            </Card.Header>
            </Card.Content>
            <Card.Content>
            We can give you access to wide range of Indian Traditional art from across the country. You can even customise and contact the artist directly.
            </Card.Content>
          </Card>
          <Card link raised style={{minWidth: 400, Height:400, marginRight:50, marginLeft: 50,marginBottom:100, textDecoration: 'none', color: 'black'}} as={NavLink} to="/drop">
            <Image src={(process.env.REACT_APP_AWS_S3_BASE_URI + 'sellnft.svg')} alt="Unavailable" width="400" height="350"/>
            <Card.Content>
            <Card.Header>
            MINT YOUR DIGITAL ART AND PUT FOR SALE
            </Card.Header>
            </Card.Content>
            <Card.Content>
            You can put your traditional or digital artwork on sale. You get exciting benefits on other artworks when you put your art on sale.
            </Card.Content>
          </Card>
          <Card link raised style={{minWidth: 400, Height:400,marginRight:50, marginLeft: 50,marginBottom:100, textDecoration: 'none', color: 'black'}} as={NavLink} to="/exploretraditionalart">
            <Image src={(process.env.REACT_APP_AWS_S3_BASE_URI + 'selllocal.svg')} alt="Unavailable" width="400" height="350"/>
            <Card.Content>
            <Card.Header>
            PUT YOUR ARTWROK FOR SALE
            </Card.Header>
            </Card.Content>
            <Card.Content>
            You can put your traditional or digital artwork on sale. You get exciting benefits on other artworks when you put your art on sale.
            </Card.Content>
          </Card>
          <Card link raised style={{minWidth: 400, Height:400,marginRight:50, marginLeft: 50,marginBottom:100, textDecoration: 'none', color: 'black'}} href="/contact">
            <Image src={(process.env.REACT_APP_AWS_S3_BASE_URI + 'collaborate.svg')} alt="Unavailable" width="400" height="350"/>
            <Card.Content>
            <Card.Header>
            CONNECTING ARTISTS AND ARCHITECTS
            </Card.Header>
            </Card.Content>
            <Card.Content>
            Connecting local artists with architects to create new experiences for the customers/companies.
            </Card.Content>
          </Card>
              </Card.Group>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container textAlign='center' as='h1' style={{marginBottom: 100}}>STEPS TO PUT UP DIGITAL ART</Container>
      <Container textAlign='center'>
        <Card.Group centered>
        <Card style={{minWidth: 350}}
                link raised
                image={uploadAsset}
                header='UPLOAD YOUR ART'
                description='Upload you digital art file in image, gif, 3d format. This will upload your file to IPFS network.'
          />
          <Card style={{minWidth: 350}}
                link raised
                image={mintnft}
                header='MINT UPLOADED ART'
                description='Mint your uploaded art. This will put information about your art on ethereum blockchain with your  address as owner of it.'
          />
          <Card style={{minWidth: 350}}
                link raised
                image={forsale}
                header='STORE IT OR PUT FOR SALE'
                description='Your art can be put on sale or you can just showcase it to gain followers.'
          />
        </Card.Group>
      </Container>
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