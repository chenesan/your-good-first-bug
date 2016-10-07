import React, { Component } from 'react';
import IssueItem from './issue-item';
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
    this.props.loadIssueList();
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
        this.props.loadIssueList();
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
          <Menu
            gridClass="col-sm-2"
            changeLanguage={this.props.changeLanguage}
          />
          <div className="content col-xs-12 col-sm-10">
            {
              this.props.issueList.map((issueData) => (
                <IssueItem issueData={issueData} />
              ))
            }
          </div>
        </div>
        <Menu
          hide={!this.state.showMenu} gridClass="col-xs-4" side
          changeLanguage={this.props.changeLanguage}
        />
        <button
          className={`menu-button${this.state.showMenu ? ' -hide' : ' -side'}`}
          onClick={this.handleClickOnMenuButton}
        >button</button>
      </main>
    );
  }
}

App.propTypes = {
  issueList: React.PropTypes.arrayOf((propVal, key) => {
    // todo: validator
    if (!propVal.title) {
      return new Error(`Issue lack of title: ${propVal} with key ${key}`);
    }
    return propVal;
  }),
  changeLanguage: React.PropTypes.func.isRequired,
  loadIssueList: React.PropTypes.func.isRequired,
};

export default App;
