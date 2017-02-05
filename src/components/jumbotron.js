import React, { Component } from 'react';
import ISvg from './lib/ISvg';
import MenuButton from './menu-button';

class Jumbotron extends Component {
  render() {
    return (
      <header className="main-jumbotron">
        <MenuButton
          showSideBarButton={this.props.showSideBarButton}
          menuButtonClickHandler={this.props.menuButtonClickHandler}
        />
        <a className="title" href="http://yourgoodfirstbug.yishan.toys">
          <img src="assets/banner_small.png" alt={this.props.title} className="fontImage" />
        </a>
      </header>
    );
  }
}

Jumbotron.propTypes = {
  showSideBarButton: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  menuButtonClickHandler: React.PropTypes.func.isRequired,
};

export default Jumbotron;
