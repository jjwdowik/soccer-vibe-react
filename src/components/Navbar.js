import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import { space, color } from 'styled-system';

const NavWrapper = styled.div`
  background-color: ${props => props.theme.colors.barcaSecondary};
  color: #FFFFFF;
  ${space}
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  &:after {
    display: block;
    position: absolute;
    content: "";
    bottom: -8px;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg,#154284 0,#cd122d);
  }
`

const NavItem = styled.div`
  ${space}
  display: inline-block;
  cursor: pointer;
  ${({ isActive }) => isActive && `
    border-bottom: 1px solid white;
  `}
`

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.switchNavigation = this.switchNavigation.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);
  }

  checkActive(value, activeValue) {
    return value == activeValue;
  }

  switchNavigation(value) {
    this.props.switchNavigation(value);
  }

  renderNavItem(value, activeValue, isLast) {
    return (
      <React.Fragment>
        <NavItem
          mx={2}
          isActive={value == activeValue}
          onClick={this.switchNavigation.bind(this, value)}
        >
          {value.toUpperCase()}
        </NavItem>
        {!isLast &&
          <span>|</span>
        }
      </React.Fragment>
    )
  }

  render() {
    let { activeValue } = this.props;
    return (
      <NavWrapper
        p={3}
      >
        {this.renderNavItem("tracked", activeValue, false)}
        {this.renderNavItem("upcoming", activeValue, false)}
        {this.renderNavItem("all", activeValue, true)}
      </NavWrapper>
    )
  }

}

export default Navbar;