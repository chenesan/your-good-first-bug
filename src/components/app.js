import React, { Component } from 'react';
import IssueItem from './issue-item';
import Jumbotron from './jumbotron';
import LoadingTip from './loading-tip';
import Menu from './menu';

class App extends Component {
  constructor() {
    super();
    this.handleClickOnMenuButton = this.handleClickOnMenuButton.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
    this.handleClickOnContent = this.handleClickOnContent.bind(this);
    this.state = {
      showSideBar: false,
    };
  }
  componentDidMount() {
    this.props.loadIssueList();
  }
  handleClickOnMenuButton() {
    if (!this.state.showSideBar) {
      this.setState(Object.assign({}, this.state, {
        showSideBar: true,
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        showSideBar: false,
      }));
    }
  }
  handleClickOnContent() {
    if (this.state.showSideBar) {
      this.setState(Object.assign({}, this.state, {
        showSideBar: false,
      }));
    }
  }
  handleScrolling(event) {
    if (typeof document !== 'undefined') {
      const { height } = document.querySelector('.main-content').getBoundingClientRect();
      const { pageY } = event;
      if (height * 0.8 < pageY) {
        this.props.loadIssueList();
      }
    }
  }
  render() {
    return (
      <main
        className="main-app"
        onScroll={this.handleScrolling} onWheel={this.handleScrolling}
      >
        <Jumbotron
          title="Your Good First Bug"
          showSideBarButton={!this.state.showSideBar}
          menuButtonClickHandler={this.handleClickOnMenuButton}
        />
        <div className="main-content container" onClick={this.handleClickOnContent}>
          <Menu
            selectors={this.props.selectors}
            selectorChangeHandler={this.props.selectorChangeHandler}
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
          hide={!this.state.showSideBar} side
          selectors={this.props.selectors}
          selectorChangeHandler={this.props.selectorChangeHandler}
        />
        {
          this.props.fetching ? <LoadingTip /> : false
        }
      </main>
    );
  }
}

App.propTypes = {
  fetching: React.PropTypes.bool.isRequired,
  issueList: React.PropTypes.arrayOf((propVal, key) => {
    // todo: validator
    if (!propVal.title) {
      return new Error(`Issue lack of title: ${propVal} with key ${key}`);
    }
    return propVal;
  }),
  selectors: React.PropTypes.object.isRequired,
  selectorChangeHandler: React.PropTypes.func.isRequired,
  loadIssueList: React.PropTypes.func.isRequired,
};

export default App;
