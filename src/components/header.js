import React, { Component } from 'react';
import MenuButton from './menu-button';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <a className="title" href="/">
          <img src="assets/banner.png" alt={this.props.title} className="banner" />
        </a>
        <MenuButton
          showSideBarButton={this.props.showSideBarButton}
          menuButtonClickHandler={this.props.menuButtonClickHandler}
        />
      </header>
    );
  }
}

Header.propTypes = {
  showSideBarButton: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  menuButtonClickHandler: React.PropTypes.func.isRequired,
};

export default Header;
