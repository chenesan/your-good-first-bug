import React, { Component } from 'react';
import BugItem from './bug-item';
import Jumbotron from './jumbotron';
import Menu from './menu';

class App extends Component {
  constructor() {
    super();
    this.handleClickOnMenuButton = this.handleClickOnMenuButton.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
    this.state = {
      showMenu: false,
    };
  }
  componentDidMount() {
    this.props.loadBugList();
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
  handleScrolling(event) {
    if (typeof document !== 'undefined') {
      const { height } = document.body.getBoundingClientRect();
      const pageY = event.pageY;
      if (height * 0.8 < pageY) {
        this.props.loadBugList();
      }
    }
  }
  render() {
    return (
      <main
        className="main-app container"
        onScroll={this.handleScrolling} onWheel={this.handleScrolling}
      >
        <Jumbotron title="Your Good First Bug" />
        <div className="main-content">
          <Menu gridClass="col-sm-2" />
          <div className="content col-xs-12 col-sm-10">
            {
              this.props.bugList.map((bugData) => (
                <BugItem bugData={bugData} />
              ))
            }
          </div>
        </div>
        <Menu hide={!this.state.showMenu} gridClass="col-xs-4" side />
        <button
          className={`menu-button${this.state.showMenu ? ' -hide' : ' -side'}`}
          onClick={this.handleClickOnMenuButton}
        >button</button>
      </main>
    );
  }
}

App.propTypes = {
  bugList: React.PropTypes.arrayOf((propVal, key) => {
    // todo: validator
    if (!propVal.title) {
      return new Error(`Bug lack of title: ${propVal} with key ${key}`);
    }
    return propVal;
  }),
  loadBugList: React.PropTypes.func.isRequired,
};

export default App;
