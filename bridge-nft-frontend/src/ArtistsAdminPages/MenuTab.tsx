import { Component } from "react";
import { Menu } from "semantic-ui-react";
import { withAuth0 } from '@auth0/auth0-react';


class MenuTab extends Component<any,any>{
    render() {
        const { activeItem } = this.props;
        return(
          <Menu fluid vertical tabular>
            <Menu.Item
              name='General'
              active={activeItem === 'General'}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name='Products'
              active={activeItem === 'Products'}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name='Orders'
              active={activeItem === 'Orders'}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name='Total Revenue Genrated'
              active={activeItem === 'Total Revenue Genrated'}
              onClick={this.props.handleItemClick}
            />
          </Menu>
        )
    }
}

export default withAuth0(MenuTab);