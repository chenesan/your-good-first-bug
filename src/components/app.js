import React, { Component } from 'react';
import Menu from './menu';

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
        <header className="main-jumbotron">jumbotron</header>
        <div className="main-content">
          <Menu gridClass="col-sm-2" />
          <div className="content col-xs-12 col-sm-5">content1</div>
          <div className="content col-xs-12 col-sm-5">content2</div>
        </div>
        <Menu hide={!this.state.showMenu} gridClass="col-xs-4" side />
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
