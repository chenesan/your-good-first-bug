import React, { Component } from 'react';
import MenuButton from './menu-button';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <MenuButton
          showSideBarButton={this.props.showSideBarButton}
          menuButtonClickHandler={this.props.menuButtonClickHandler}
        />
        <a className="title" href="/">
          <img src="assets/banner_small.png" alt={this.props.title} className="fontImage" />
        </a>
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
