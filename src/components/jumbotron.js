import React, { Component } from 'react';

class Jumbotron extends Component {
  render() {
    return (
      <header className="main-jumbotron">
        <div
          className={`menu-button${this.props.showSideBarButton ? ' -side' : ' -hide'}`}
          onClick={this.props.menuButtonClickHandler}
        >
          <img src="assets/images/icons/menu.svg" alt="menu" className="icon" />
        </div>
        <h1 className="title">
          <div className="text">{this.props.title}</div>
          <img src="assets/images/title.png" alt={this.props.title} className="fontImage" />
        </h1>
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
