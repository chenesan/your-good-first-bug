import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.handleClickOnMenuButton = this.handleClickOnMenuButton.bind(this);
    this.state = {
      showMenu: false,
    };
  }
  handleClickOnMenuButton() {
    if (!this.state.showMenu) {
      this.setState(Object.assign({}, this.state, {
        showMenu: true,
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        showMenu: false,
      }));
    }
  }
  render() {
    return (
      <div className="main-app container">
        <div className="main-jumbotron">jumbotron</div>
        <div className="main-content">
          <div className="main-menu col-sm-2">menu</div>
          <div className="content col-xs-12 col-sm-5">content1</div>
          <div className="content col-xs-12 col-sm-5">content2</div>
        </div>
        <div
          className={`main-menu col-xs-4 -side${this.state.showMenu ? '' : ' -hide'}`}
          onClick={this.handleClickOnMenuButton}
        >menu</div>
        <div
          className={`menu-button${this.state.showMenu ? ' -hide' : ' -side'}`}
          onClick={this.handleClickOnMenuButton}
        >button</div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
